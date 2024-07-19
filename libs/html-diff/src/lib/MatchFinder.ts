/* eslint-disable */
import { Match } from './Match';
import { MatchOptions } from './MatchOptions';
import * as Utils from './Utils';

function putNewWord(block: string[], word: string, blockSize: number): string | null {
  block.push(word);

  if (block.length > blockSize) {
    block.shift();
  }

  if (block.length !== blockSize) {
    return null;
  }

  return block.join('');
}

// Finds the longest match in given texts. It uses indexing with fixed granularity that is used to compare blocks of text.
export class MatchFinder {
  private wordIndices: any;

  constructor(
    public oldWords: string[],
    public newWords: string[],
    public startInOld: number,
    public endInOld: number,
    public startInNew: number,
    public endInNew: number,
    public options: MatchOptions
  ) {}

  indexNewWords(): void {
    this.wordIndices = new Map();
    const block: string[] = [];
    for (let i = this.startInNew; i < this.endInNew; i++) {
      // if word is a tag, we should ignore attributes as attribute changes are not supported (yet)
      const word = this.normalizeForIndex(this.newWords[i]);
      const key = putNewWord(block, word, this.options.blockSize);

      if (key === null) {
        continue;
      }

      if (this.wordIndices.has(key)) {
        this.wordIndices.get(key)!.push(i);
      } else {
        this.wordIndices.set(key, [i]);
      }
    }
  }

  // Converts the word to index-friendly value so it can be compared with other similar words
  normalizeForIndex(word: string): string {
    word = Utils.stripAnyAttributes(word);
    if (this.options.ignoreWhitespaceDifferences && Utils.isWhiteSpace(word)) {
      return ' ';
    }

    return word;
  }

  findMatch(): Match | null {
    this.indexNewWords();
    this.removeRepeatingWords();

    if (this.wordIndices.length === 0) {
      return null;
    }

    let bestMatchInOld = this.startInOld;
    let bestMatchInNew = this.startInNew;
    let bestMatchSize = 0;

    let matchLengthAt = new Map();
    const blockSize = this.options.blockSize;
    const block: string[] = [];

    for (let indexInOld = this.startInOld; indexInOld < this.endInOld; indexInOld++) {
      const word = this.normalizeForIndex(this.oldWords[indexInOld]);
      const index = putNewWord(block, word, blockSize);

      if (index === null) {
        continue;
      }

      const newMatchLengthAt = new Map();

      if (!this.wordIndices.has(index)) {
        matchLengthAt = newMatchLengthAt;
        continue;
      }

      for (const indexInNew of this.wordIndices.get(index)) {
        const newMatchLength = (matchLengthAt.has(indexInNew - 1) ? matchLengthAt.get(indexInNew - 1) : 0) + 1;
        newMatchLengthAt.set(indexInNew, newMatchLength);

        if (newMatchLength > bestMatchSize) {
          bestMatchInOld = indexInOld - newMatchLength - blockSize + 2;
          bestMatchInNew = indexInNew - newMatchLength - blockSize + 2;
          bestMatchSize = newMatchLength;
        }
      }

      matchLengthAt = newMatchLengthAt;
    }

    return bestMatchSize !== 0 ? new Match(bestMatchInOld, bestMatchInNew, bestMatchSize + blockSize - 1) : null;
  }

  // This method removes words that occur too many times. This way it reduces total count of comparison operations
  // and as result the diff algoritm takes less time. But the side effect is that it may detect false differences of
  // the repeating words.
  removeRepeatingWords(): void {
    const threshold = this.newWords.length + this.options.repeatingWordsAccuracy;
    const repeatingWords = Array.from(this.wordIndices.entries())
      .filter((i: any) => i[1].length > threshold)
      .map((i: any) => i[0]);
    for (const w of repeatingWords) {
      this.wordIndices.delete(w);
    }
  }
}
