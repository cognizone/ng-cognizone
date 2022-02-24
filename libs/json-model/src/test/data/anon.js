const fs = require('fs');

const filePath = './legiswiss-act-1.json';
const file = fs.readFileSync(filePath);
const json = JSON.parse(file);

const renamingMap = {};
let count = 0;

[json.data, ...json.included].forEach(anonNode);

fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');

function manyToArray(val) {
  return Array.isArray(val) ? val : [val];
}

function anonNode(typedResource) {
  typedResource.uri = anonUri(typedResource.uri);
  if (typedResource.references) {
    Object.entries(typedResource.references).forEach(([key, value]) => {
      typedResource.references[key] = anonManyUris(value);
    });
  }
  if (typedResource.attributes) {
    Object.entries(typedResource.attributes).forEach(([key, value]) => {
      if (value['rdfs:Resource']) {
        value['rdfs:Resource'] = anonManyUris(value['rdfs:Resource']);
      } else {
        const subKey = Object.keys(value)[0];
        if (subKey === 'xsd:string') {
          value[subKey] = anonManyValue(value[subKey], v => 'string-' + ++count);
        } else if (subKey === 'xsd:dateTime') {
          value[subKey] = anonManyValue(value[subKey], v => new Date().toISOString());
        } else if (subKey === 'rdf:langString') {
          value[subKey] = { en: ['en label' + ++count] };
        } else if (subKey === 'xsd:date') {
          value[subKey] = anonManyValue(value[subKey], v => new Date().toISOString().split('T')[0]);
        }
      }
    });
  }
}

function anonManyValue(value, transformer) {
  const isArray = Array.isArray(value);
  const newValues = manyToArray(value).map(transformer);
  return isArray ? newValues : newValues[0];
}

function anonManyUris(value) {
  const isArray = Array.isArray(value);
  const newValues = manyToArray(value).map(v => anonUri(v));
  return isArray ? newValues : newValues[0];
}

function anonUri(uri) {
  if (renamingMap[uri]) return renamingMap[uri];
  return (renamingMap[uri] = 'http://resource/my-domain/' + ++count);
}
