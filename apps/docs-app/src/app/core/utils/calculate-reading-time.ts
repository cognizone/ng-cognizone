export function calculateReadingTimeMinutes(...texts: string[]): number {
  const wordsPerMinute = 200;
  const wordsCount = texts.map(text => text.split(/\s/gm).length).reduce((acc, current) => acc + current, 0);
  return wordsCount / wordsPerMinute;
}
