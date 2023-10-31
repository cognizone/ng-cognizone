import { MetaId } from './meta-id';

export interface SeoState {
  metaValues?: { [metaId: MetaId]: MetaValue[] };
}

export interface MetaValue {
  id: string;
  value: string;
  index?: number;
}

export type MetaValueLike = Partial<MetaValue> | string;
