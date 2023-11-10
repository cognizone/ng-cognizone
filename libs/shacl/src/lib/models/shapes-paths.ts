import { HANAMI, SH } from '@cognizone/lod';

export const pathsPointingToShapes = [SH.or, SH.not, SH.and, SH.xone];
export const pathsPointingToPropertyShapes = [...pathsPointingToShapes, SH.property, HANAMI.listOf];
export const pathsPointingToNodeShapes = [...pathsPointingToShapes, HANAMI.shapes, SH.node];
export const pathsPointingToAnyShape = Array.from(new Set([...pathsPointingToNodeShapes, ...pathsPointingToPropertyShapes]));
