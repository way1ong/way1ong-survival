// A page element with attributes and children, in one call.
type Child = Node | string | null | undefined | false;

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string | number | boolean> = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) {
    if (value === false) continue;
    el.setAttribute(name, value === true ? '' : String(value));
  }
  for (const child of children) if (child) el.append(child);
  return el;
}
