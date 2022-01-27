export interface Prefixes {
  [prefix: string]: string;
}

export const KNOWN_PREFIXES: Prefixes = {
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
};
