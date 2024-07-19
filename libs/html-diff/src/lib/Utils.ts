/* eslint-disable */
const tagRegex = /^\s*<\/?[^>]+>\s*$/;
const tagWordRegex = /<[^\s>]+/;
const whitespaceRegex = /^(\s|&nbsp;)+$/;
const wordRegex = /[\w\#@]+/;

const specialCaseWordTags = ['<img'];

export function isTag(item: string | null | undefined): boolean {
  if (item == null) return false;
  if (specialCaseWordTags.some(re => item.startsWith(re))) {
    return false;
  }

  return tagRegex.test(item);
}

export function stripTagAttributes(word: string): string {
  const tag = tagWordRegex.exec(word)?.[0] ?? '';
  return tag + (word.endsWith('/>') ? '/>' : '>');
}

export function wrapText(text: string, tagName: string, cssClass: string): string {
  return ['<', tagName, ' class="', cssClass, '">', text, '</', tagName, '>'].join('');
}

export function isStartOfTag(val: string): boolean {
  return val === '<';
}

export function isEndOfTag(val: string): boolean {
  return val === '>';
}

export function isStartOfEntity(val: string): boolean {
  return val === '&';
}

export function isEndOfEntity(val: string): boolean {
  return val === ';';
}

export function isWhiteSpace(value: string): boolean {
  return whitespaceRegex.test(value);
}

export function stripAnyAttributes(word: string): string {
  if (isTag(word)) {
    return stripTagAttributes(word);
  }

  return word;
}

export function isWord(text: string): boolean {
  return wordRegex.test(text);
}
