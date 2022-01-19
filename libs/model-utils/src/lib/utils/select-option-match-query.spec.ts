import { selectOptionMatchQuery } from './select-option-match-query';

describe('selectOptionMatchQuery', () => {
  it('should match regardless of casing', () => {
    expect(selectOptionMatchQuery({ value: '', label: 'tHis Is SoMeThing Strange' }, 'THING StrAN')).toBeTruthy();
    expect(selectOptionMatchQuery({ value: '', label: 'tHis Is SoMeThing Strange' }, 'thing normal')).toBeFalsy();
  });

  it('should match if any label in LangString is matching', () => {
    expect(
      selectOptionMatchQuery({ value: '', label: { en: ['tHis Is SoMeThing Strange'], fr: ['ceci est étrange'] } }, 'THING StrAN')
    ).toBeTruthy();
    expect(
      selectOptionMatchQuery({ value: '', label: { en: ['tHis Is SoMeThing Strange'], fr: ['ceci est étrange'] } }, 'est ÉTR')
    ).toBeTruthy();
    expect(
      selectOptionMatchQuery({ value: '', label: { en: ['tHis Is SoMeThing Strange'], fr: ['ceci est étrange'] } }, 'est norm')
    ).toBeFalsy();
  });

  it('should match if any label in LangStringSimple is matching', () => {
    expect(
      selectOptionMatchQuery({ value: '', label: { en: 'tHis Is SoMeThing Strange', fr: 'ceci est étrange' } }, 'THING StrAN')
    ).toBeTruthy();
    expect(
      selectOptionMatchQuery({ value: '', label: { en: 'tHis Is SoMeThing Strange', fr: 'ceci est étrange' } }, 'est ÉTR')
    ).toBeTruthy();
    expect(
      selectOptionMatchQuery({ value: '', label: { en: 'tHis Is SoMeThing Strange', fr: 'ceci est étrange' } }, 'est norm')
    ).toBeFalsy();
  });
});
