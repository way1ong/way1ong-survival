// The app's own settings (docs/SPEC.md). Advice and its sources never live here: they come from the
// sources in docs/SOURCES.md. (C) = Claude's choice within the approved plan.

export const SURVIVAL = {
  /** The working name until the final one is chosen (decision of 27.11). */
  name: 'way1ong Survival',
  /** The studio's site for the "Made by way1ong" line; null — no link. */
  links: { site: 'https://way1ong.eu' as string | null },
  /** Where the app lives (decision of 27.11); wrangler.jsonc names the same domain — a test keeps them equal. */
  address: 'https://survival.way1ong.eu',
  /** Where the chosen language is kept on the device (C). Nothing else is kept, nothing is sent. */
  langKey: 'way1ong-survival-lang',
} as const;
