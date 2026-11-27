// The app as it is served on its real address, compared with the build in dist/:
//   npm run build && npm run check:live
// A browser must get the page byte for byte as it was built — nothing added on the way (Cloudflare adds a
// measuring script of its Web Analytics to the pages of a domain unless it is forbidden: public/_headers) —
// and the files that make the app installable and offline must be there. Needs the network; uses curl,
// which follows the proxy settings of the machine. Not part of the build.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const origin = /address: '([^']+)'/.exec(readFileSync(join(root, 'src', 'config.ts'), 'utf8'))?.[1];
if (!origin) {
  console.error('check-live: no address in src/config.ts');
  process.exit(1);
}
if (!existsSync(join(dist, 'index.html'))) {
  console.error('check-live: dist/ not found — run npm run build first');
  process.exit(1);
}

// What a browser sends when it opens a page: Cloudflare changes pages only for such requests.
const AS_BROWSER = [
  '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  '-A', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  '--compressed',
];
/** One request: status, the Cache-Control header, body. */
function get(url) {
  const marker = '\n--check-live--\n';
  let out;
  try {
    out = execFileSync('curl', ['-sS', '-m', '30', ...AS_BROWSER, '-o', '-', '-w', `${marker}%{http_code}\n%header{cache-control}`, url], { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (error) {
    return { status: 0, cacheControl: '', body: Buffer.alloc(0), failed: String(error.stderr ?? error.message).trim().split('\n').pop() };
  }
  const at = out.lastIndexOf(marker);
  const [status, cacheControl] = out.subarray(at + marker.length).toString('utf8').split('\n');
  return { status: Number(status), cacheControl: cacheControl ?? '', body: out.subarray(0, at) };
}
const sha = (buffer) => createHash('sha256').update(buffer).digest('hex').slice(0, 12);

const problems = [];
const home = `${origin}/`;
const live = get(home);
if (live.status !== 200) {
  problems.push(`${home}: ${live.failed ?? `answer ${live.status}`}`);
} else {
  const built = readFileSync(join(dist, 'index.html'));
  if (!live.body.equals(built)) {
    const added = live.body.toString('utf8').match(/<script[^>]*src="https?:\/\/[^"]+"/g) ?? [];
    problems.push(`${home}: the page differs from the build (${live.body.length} bytes ${sha(live.body)}, built ${built.length} bytes ${sha(built)})` + (added.length ? `; scripts from outside: ${added.join(' ')}` : '; another version may still be deployed'));
  }
  if (!/\bno-transform\b/.test(live.cacheControl)) problems.push(`${home}: Cache-Control has no "no-transform" (${live.cacheControl || 'none'}) — public/_headers`);
  for (const file of ['manifest.webmanifest', 'sw.js', 'icons/icon-192.png']) {
    const answer = get(`${origin}/${file}`);
    if (answer.status !== 200) problems.push(`${origin}/${file}: answer ${answer.status}`);
    else if (!answer.body.equals(readFileSync(join(dist, file)))) problems.push(`${origin}/${file}: differs from the build — another version may still be deployed`);
  }
}

if (problems.length) {
  console.error(`check-live: ${problems.length} problem(s)\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`check-live: ${origin} serves this build unchanged`);
