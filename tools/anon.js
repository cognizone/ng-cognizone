const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../libs/json-model/src/test/data/draft-4.json');

const graph = JSON.parse(readFileSync(filePath, 'utf8'));

let sequenceNumber = 0;
const uriReplacementMap = {};

function replaceUri(uri) {
  if (uriReplacementMap[uri]) return uriReplacementMap[uri];
  return (uriReplacementMap[uri] = `http://resource/${sequenceNumber++}`);
}

function anonymizeAttributeValue(value, type) {
  const newValue = manyToArray(value).map(subValue => {
    if (typeof subValue === 'object' && subValue != null) {
      const newSubValue = {};
      Object.keys(subValue).forEach(subKey => {
        newSubValue[subKey] = anonymizeAttributeValue(subValue[subKey]);
      });
    } else if (type === 'xsd:date') {
      return dateToDateString(new Date());
    } else if (type === 'xsd:dateTime') {
      return new Date().toISOString();
    } else if (typeof subValue === 'string') {
      return `string ${sequenceNumber++}`;
    }
    return subValue;
  });

  return Array.isArray(value) ? newValue : manyToOne(newValue);
}

function anonymizeReferenceValues(value) {
  const newValue = manyToArray(value).map(replaceUri);
  return Array.isArray(value) ? newValue : manyToOne(newValue);
}

function anonymizeNode(node) {
  node.uri = replaceUri(node.uri);
  if (node.attributes) {
    Object.keys(node.attributes).forEach(attrKey => {
      Object.keys(node.attributes[attrKey]).forEach(typeKey => {
        node.attributes[attrKey][typeKey] = anonymizeAttributeValue(node.attributes[attrKey][typeKey], typeKey);
      });
    });
  }
  if (node.references) {
    Object.keys(node.references).forEach(refKey => {
      node.references[refKey] = anonymizeReferenceValues(node.references[refKey]);
    });
  }
}

function manyToArray(x) {
  return x == null ? [] : Array.isArray(x) ? x : [x];
}

function manyToOne(x) {
  return Array.isArray(x) ? x[0] : x;
}

function dateToDateString(value) {
  const year = value.getFullYear().toString().padStart(4, '0');
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = value.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

[graph.data, ...(graph.included ?? [])].forEach(anonymizeNode);

writeFileSync(filePath, JSON.stringify(graph, null, 2));
