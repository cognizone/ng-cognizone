export function escapeHtml(strings: TemplateStringsArray, ...keys: string[]): string {
  return strings
    .reduce((acc, s) => [...acc, s, keys.shift() || ''], [] as string[])
    .filter(s => s)
    .map(s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot'))
    .join('');
}
