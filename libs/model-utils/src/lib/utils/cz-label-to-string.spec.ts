import { LangString, LangStringSimple } from '../models';
import { czLabelToString } from './cz-label-to-string';

describe('czLabelToString', () => {
  const langString: LangString = {
    en: ['Hello World!'],
    fr: ['Bonjour Monde !'],
  };

  const langStringSimple: LangStringSimple = {
    en: 'Hello World!',
    fr: 'Bonjour Monde !',
  };

  it('should extract label from LangString', () => {
    expect(czLabelToString(langString, 'en')).toBe('Hello World!');
    expect(czLabelToString(langString, 'fr')).toBe('Bonjour Monde !');
    expect(czLabelToString(langString, 'de')).toBe(undefined);
    expect(czLabelToString(langString, 'de', ['fr', 'en'])).toBe('Bonjour Monde !');
    expect(czLabelToString(langString, 'de', ['it', 'en', 'fr'])).toBe('Hello World!');
  });

  it('should extract label from LangStringSimple', () => {
    expect(czLabelToString(langStringSimple, 'en')).toBe('Hello World!');
    expect(czLabelToString(langStringSimple, 'fr')).toBe('Bonjour Monde !');
    expect(czLabelToString(langStringSimple, 'de')).toBe(undefined);
    expect(czLabelToString(langStringSimple, 'de', ['fr', 'en'])).toBe('Bonjour Monde !');
    expect(czLabelToString(langStringSimple, 'de', ['it', 'en', 'fr'])).toBe('Hello World!');
  });

  it('should keep string as-is', () => {
    expect(czLabelToString('pikachu', 'en')).toBe('pikachu');
    expect(czLabelToString('pikachu', 'fr')).toBe('pikachu');
    expect(czLabelToString('pikachu', 'de')).toBe('pikachu');
    expect(czLabelToString('pikachu', 'de', ['fr', 'en'])).toBe('pikachu');
    expect(czLabelToString('pikachu', 'de', ['it', 'en', 'fr'])).toBe('pikachu');
  });
});
