import { JsonModel, JsonModelFlat } from '@cognizone/json-model';

export type NodeRecipe<T extends JsonModel> = (draft: JsonModelFlat<T>) => void;
