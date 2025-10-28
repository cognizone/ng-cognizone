export interface DataError {
  graphUri: string;
  nodeUri: string;
  propertyKey?: string;
  value?: unknown;
  errorMessage: string;
}
