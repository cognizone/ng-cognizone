import { LangString } from '@cognizone/model-utils';
import { isJsonLdValueLang, JsonLdValue } from '../models';

export function jsonLdValuesToLangString(values: JsonLdValue[] | undefined): LangString | undefined {
  if (!values?.length) return undefined;
  const langString = values.reduce<LangString>((acc, value) => {
    if (!isJsonLdValueLang(value)) return acc;
    const lang = value['@language'];
    acc[lang] = acc[lang] ?? [];
    acc[lang].push(value['@value']);
    return acc;
  }, {});
  return Object.keys(langString).length === 0 ? undefined : langString;
}
