import { camelCase } from 'lodash';

export function normalizeClassId(classId: string, prefix?: string): string {
  const ucFirst = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
  const pascalCase = (w: string) => ucFirst(camelCase(w));

  const normalized = classId.split(':').map(ucFirst).join('');

  return `${prefix ?? ''}${pascalCase(normalized)}`;
}
