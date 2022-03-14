const fs = require('fs');

const institutionsJson = JSON.parse(fs.readFileSync('./legal-institution.json'));

const whitelistAttributes = ['skos:prefLabel'];
const whitelistReferences = ['skos:member', 'skos:hasTopConcept', 'skos:hasMicroThesaurus', 'skos:narrower'];

function cleanUp(node) {
  node.attributes['skos:prefLabel'] = {};
  node.attributes['skos:prefLabel']['xsd:string'] = node.attributes?.prefLabel?.['rdf:langString']?.fr?.[0];
  node.type = 'skos:' + node.type;
  node.references['skos:hasTopConcept'] = node.references?.hasTopConcept;
  node.references['skos:member'] = node.references?.member;
  node.references['skos:hasMicroThesaurus'] = node.references?.hasMicroThesaurus;
  node.references['skos:narrower'] = node.references?.narrower;
  if (node.attributes) {
    Object.keys(node.attributes)
      .filter(key => !whitelistAttributes.includes(key))
      .forEach(key => delete node.attributes[key]);
  }
  if (node.references) {
    Object.keys(node.references)
      .filter(key => !whitelistReferences.includes(key))
      .forEach(key => delete node.references[key]);
  }
}

cleanUp(institutionsJson.data);
institutionsJson.included.forEach(cleanUp);
institutionsJson.context = {
  base: 'http://example.org/person#',
  prefix: {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    sh: 'http://www.w3.org/ns/shacl#',
    shacz: 'https://data.cogni.zone/model/ui/shacl-extension/',
    skos: 'http://www.w3.org/2004/02/skos/core#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
  },
};

fs.writeFileSync('./new.json', JSON.stringify(institutionsJson, null, 2), 'utf8');
