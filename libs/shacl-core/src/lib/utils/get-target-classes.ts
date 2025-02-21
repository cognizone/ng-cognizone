import { ExpandedJsonLdContainer, getAllValuesGen, isOfType } from '@cognizone/json-ld-core';
import { RDFS, SH } from '@cognizone/lod-core';
import { ShNodeShape } from '../models';

export function getTargetClasses(nodeShape: ShNodeShape, shapesGraph: ExpandedJsonLdContainer): string[] {
  const classes = [];
  for (const targetClass of getAllValuesGen<string>(nodeShape[SH.targetClass], shapesGraph)) {
    classes.push(targetClass);
  }

  if (isOfType(nodeShape, RDFS.Class) && !classes.includes(nodeShape['@id'])) {
    classes.push(nodeShape['@id']);
  }
  return classes;
}
