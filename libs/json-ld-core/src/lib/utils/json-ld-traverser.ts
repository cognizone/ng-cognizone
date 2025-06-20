import { Many, Primitive } from '@cognizone/model-utils';
import { AnyJsonLdNode, JsonLdNode, JsonLdValue } from '../models/json-ld';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getChildUri } from './get-child-uri';
import { getChildrenUris } from './get-children-uris';
import { getRawValue } from './get-raw-value';
import { getRawValues } from './get-raw-values';
import { getValue } from './get-value';
import { getValues } from './get-values';

/**
 * Main traverser class for navigating through JSON-LD data structures.
 *
 * This class provides a fluent API for traversing JSON-LD graphs and accessing
 * nodes, properties, and values within the graph structure.
 *
 * @example
 * ```typescript
 * const traverser = new JsonLdTraverser(jsonLdContainer);
 * const nodeTraverser = traverser.node('http://example.org/node1');
 * const children = nodeTraverser.children('http://example.org/hasChild');
 * ```
 */
export class JsonLdTraverser {
  /**
   * Creates a new JsonLdTraverser instance.
   *
   * @param jsonLd - The expanded JSON-LD container containing the graph data
   */
  constructor(private readonly jsonLd: ExpandedJsonLdContainer) {}

  /**
   * Creates a node traverser for a specific URI within the JSON-LD graph.
   *
   * @param uri - The URI of the node to traverse
   * @returns A JsonLdNodeTraverser instance for the specified node
   *
   * @example
   * ```typescript
   * const nodeTraverser = traverser.node('http://example.org/person1');
   * ```
   */
  node(uri: string): JsonLdNodeTraverser {
    return new JsonLdNodeTraverser(this.jsonLd, uri);
  }

  /**
   * Returns the raw expanded JSON-LD container.
   *
   * @returns The underlying JSON-LD container
   */
  raw(): ExpandedJsonLdContainer {
    return this.jsonLd;
  }
}

/**
 * Node-specific traverser for navigating properties and values of a JSON-LD node.
 *
 * This class provides methods to access child nodes, literal values, and raw
 * JSON-LD data for a specific node within the graph.
 *
 * @example
 * ```typescript
 * const nodeTraverser = traverser.node('http://example.org/person1');
 * const name = nodeTraverser.value<string>('http://xmlns.com/foaf/0.1/name');
 * const children = nodeTraverser.children('http://example.org/hasChild');
 * ```
 */
export class JsonLdNodeTraverser {
  /**
   * Creates a new JsonLdNodeTraverser instance.
   *
   * @param jsonLd - The expanded JSON-LD container
   * @param uri - The URI of the node to traverse
   */
  constructor(private readonly jsonLd: ExpandedJsonLdContainer, public readonly uri: string) {}

  /**
   * Gets child nodes by following a property path.
   *
   * This method traverses the JSON-LD graph following the specified property path
   * and returns all matching child nodes as traversers.
   *
   * @param path - Single property URI or array of property URIs to follow
   * @param wide - If true, returns all values; if false, returns only the first value
   * @returns Array of JsonLdNodeTraverser instances for child nodes
   *
   * @example
   * ```typescript
   * // Single property
   * const children = nodeTraverser.children('http://example.org/hasChild');
   *
   * // Multiple properties (deep traversal)
   * const deepChildren = nodeTraverser.children([
   *   'http://example.org/hasParent',
   *   'http://example.org/hasSibling'
   * ]);
   *
   * // Get only first child
   * const firstChild = nodeTraverser.children('http://example.org/hasChild', false);
   * ```
   */
  children(path: Many<string>, wide: boolean = true): JsonLdNodeTraverser[] {
    const childUris = getChildrenUris(this.jsonLd, this.uri, path, wide);
    return childUris.map((uri: string) => new JsonLdNodeTraverser(this.jsonLd, uri));
  }

  /**
   * Gets the first child node by following a property path.
   *
   * This is a convenience method that returns only the first child node
   * found when traversing the specified property path.
   *
   * @param path - Single property URI or array of property URIs to follow
   * @returns The first child node traverser, or undefined if no children found
   *
   * @example
   * ```typescript
   * const firstChild = nodeTraverser.child('http://example.org/hasChild');
   * if (firstChild) {
   *   const childName = firstChild.value<string>('http://xmlns.com/foaf/0.1/name');
   * }
   * ```
   */
  child(path: Many<string>): JsonLdNodeTraverser | undefined {
    const childUri = getChildUri(this.jsonLd, this.uri, path);
    return childUri ? new JsonLdNodeTraverser(this.jsonLd, childUri) : undefined;
  }

  /**
   * Gets literal values from a property path.
   *
   * This method extracts primitive values (strings, numbers, booleans) from
   * JSON-LD literal objects and reference URIs from reference objects.
   *
   * @param path - Single property URI or array of property URIs to follow
   * @returns Array of primitive values
   *
   * @example
   * ```typescript
   * // Get string values
   * const names = nodeTraverser.values<string>('http://xmlns.com/foaf/0.1/name');
   *
   * // Get number values
   * const ages = nodeTraverser.values<number>('http://example.org/age');
   *
   * // Deep traversal
   * const deepValues = nodeTraverser.values<string>([
   *   'http://example.org/hasParent',
   *   'http://xmlns.com/foaf/0.1/name'
   * ]);
   * ```
   */
  values<T extends Primitive>(path: Many<string>): T[] {
    return getValues<T>(this.jsonLd, this.uri, path);
  }

  /**
   * Gets the first literal value from a property path.
   *
   * This is a convenience method that returns only the first value
   * found when traversing the specified property path.
   *
   * @param path - Single property URI or array of property URIs to follow
   * @returns The first value, or undefined if no values found
   *
   * @example
   * ```typescript
   * const name = nodeTraverser.value<string>('http://xmlns.com/foaf/0.1/name');
   * if (name) {
   *   console.log(`Name: ${name}`);
   * }
   * ```
   */
  value<T extends Primitive>(path: Many<string>): T | undefined {
    return getValue<T>(this.jsonLd, this.uri, path);
  }

  /**
   * Gets raw JSON-LD values from a property path.
   *
   * This method returns the complete JSON-LD value objects (including metadata
   * like language tags, data types, etc.) rather than just the primitive values.
   *
   * @param path - Single property URI or array of property URIs to follow
   * @param wide - If true, returns all values; if false, returns only the first value
   * @returns Array of raw JSON-LD value objects
   *
   * @example
   * ```typescript
   * // Get raw values with language tags
   * const rawNames = nodeTraverser.rawValues('http://xmlns.com/foaf/0.1/name');
   * // Returns: [{ '@value': 'John', '@language': 'en' }, { '@value': 'Jean', '@language': 'fr' }]
   *
   * // Get only first raw value
   * const firstRawName = nodeTraverser.rawValues('http://xmlns.com/foaf/0.1/name', false);
   * ```
   */
  rawValues<T extends JsonLdValue>(path: Many<string>, wide: boolean = true): T[] {
    return getRawValues<T>(this.jsonLd, this.uri, path, wide);
  }

  /**
   * Gets the first raw JSON-LD value from a property path.
   *
   * This is a convenience method that returns only the first raw value
   * found when traversing the specified property path.
   *
   * @param path - Single property URI or array of property URIs to follow
   * @returns The first raw JSON-LD value, or undefined if no values found
   *
   * @example
   * ```typescript
   * const rawName = nodeTraverser.rawValue('http://xmlns.com/foaf/0.1/name');
   * if (rawName && '@value' in rawName) {
   *   console.log(`Name: ${rawName['@value']} (${rawName['@language']})`);
   * }
   * ```
   */
  rawValue<T extends JsonLdValue>(path: Many<string>): T | undefined {
    return getRawValue<T>(this.jsonLd, this.uri, path);
  }

  /**
   * Checks if the node exists in the JSON-LD graph.
   *
   * @returns True if the node exists, false otherwise
   *
   * @example
   * ```typescript
   * if (nodeTraverser.exists()) {
   *   // Node exists, safe to access properties
   *   const name = nodeTraverser.value<string>('http://xmlns.com/foaf/0.1/name');
   * }
   * ```
   */
  exists(): boolean {
    return this.jsonLd.nodes[this.uri] !== undefined;
  }

  /**
   * Gets the types of the current node.
   *
   * @returns Array of type URIs for the node
   *
   * @example
   * ```typescript
   * const types = nodeTraverser.types();
   * // Returns: ['http://xmlns.com/foaf/0.1/Person', 'http://example.org/Employee']
   * ```
   */
  types(): string[] {
    const node = this.raw();
    return node?.['@type'] ?? [];
  }

  /**
   * Checks if the node has a specific type.
   *
   * @param type - The type URI to check for
   * @returns True if the node has the specified type, false otherwise
   *
   * @example
   * ```typescript
   * if (nodeTraverser.hasType('http://xmlns.com/foaf/0.1/Person')) {
   *   // Node is a Person, safe to access Person-specific properties
   *   const name = nodeTraverser.value<string>('http://xmlns.com/foaf/0.1/name');
   * }
   * ```
   */
  hasType(type: string): boolean {
    return this.types().includes(type);
  }

  /**
   * Gets all properties that have values on this node.
   *
   * This excludes the special JSON-LD properties '@id' and '@type'.
   *
   * @returns Array of property URIs that have values
   *
   * @example
   * ```typescript
   * const properties = nodeTraverser.properties();
   * // Returns: ['http://xmlns.com/foaf/0.1/name', 'http://xmlns.com/foaf/0.1/age', ...]
   *
   * properties.forEach(prop => {
   *   const values = nodeTraverser.values(prop);
   *   console.log(`${prop}: ${values.join(', ')}`);
   * });
   * ```
   */
  properties(): string[] {
    const node = this.raw();
    if (!node) return [];
    return Object.keys(node).filter(key => key !== '@id' && key !== '@type');
  }

  /**
   * Checks if the node has a specific property.
   *
   * @param property - The property URI to check for
   * @returns True if the node has the specified property, false otherwise
   *
   * @example
   * ```typescript
   * if (nodeTraverser.hasProperty('http://xmlns.com/foaf/0.1/name')) {
   *   const name = nodeTraverser.value<string>('http://xmlns.com/foaf/0.1/name');
   *   console.log(`Name: ${name}`);
   * }
   * ```
   */
  hasProperty(property: string): boolean {
    const node = this.raw();
    return (node as AnyJsonLdNode)?.[property] !== undefined;
  }

  /**
   * Gets the raw JSON-LD node data.
   *
   * This returns the complete node object as it exists in the JSON-LD graph,
   * including all properties and their values.
   *
   * @returns The raw JSON-LD node, or undefined if the node doesn't exist
   *
   * @example
   * ```typescript
   * const rawNode = nodeTraverser.raw();
   * if (rawNode) {
   *   console.log('Node ID:', rawNode['@id']);
   *   console.log('Node types:', rawNode['@type']);
   *   console.log('All properties:', Object.keys(rawNode));
   * }
   * ```
   */
  raw(): JsonLdNode {
    return this.jsonLd.nodes[this.uri];
  }

  /**
   * Gets the raw expanded JSON-LD container.
   *
   * This provides access to the complete JSON-LD graph structure.
   *
   * @returns The underlying expanded JSON-LD container
   *
   * @example
   * ```typescript
   * const container = nodeTraverser.rawJsonLd();
   * console.log('Total nodes in graph:', Object.keys(container.nodes).length);
   * ```
   */
  rawJsonLd(): ExpandedJsonLdContainer {
    return this.jsonLd;
  }
}
