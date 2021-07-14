import { JsonModel, JsonModelFlat } from '@cognizone/ng-application-profile';

export type NodeRecipe<T extends JsonModel> = (draft: JsonModelFlat<T>) => void;
