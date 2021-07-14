export interface Operation {
  id: string;
  enabled: boolean;
  description?: string;
}

export interface OperationGroupDescription {
  id: string;
  uri?: string;
}

export type OperationGroupDescriptionLike = OperationGroupDescription | string;

export function toOperationGroupDescription(value: OperationGroupDescriptionLike): OperationGroupDescription {
  return typeof value === 'string' ? { id: value } : value;
}

export interface OperationGroup {
  id: string;
  uri?: string;
  groups?: OperationGroup[];
  operations?: Operation[];
}
