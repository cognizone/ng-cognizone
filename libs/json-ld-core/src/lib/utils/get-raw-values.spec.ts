import { basicTestGraph, deepTestGraph, wideTestGraph } from './tests';
import { getRawValues } from './get-raw-values';

describe('getRawValues', () => {
  describe('basic functionality', () => {
    it('should return raw values for single literal property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:singleLiteral');
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'test value' });
    });

    it('should return raw values for multiple literal properties', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:multipleLiterals');
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'value1' });
      expect(rawValues[1]).toEqual({ '@value': 'value2' });
    });

    it('should return raw values for mixed values property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:mixedValues');
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({
        '@id': 'test:child1',
        '@type': ['test:ChildType'],
        'test:childProperty': [
          {
            '@value': 'child value',
          },
        ],
      });
      expect(rawValues[1]).toEqual({ '@value': 'literal value' });
    });

    it('should return empty array for non-existent property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:nonExistentProperty');
      expect(rawValues).toHaveLength(0);
    });

    it('should return empty array for empty array property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:emptyArray');
      expect(rawValues).toHaveLength(0);
    });

    it('should return empty array for non-existent node', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:nonExistentNode', 'test:anyProperty');
      expect(rawValues).toHaveLength(0);
    });

    it('should return empty array for completely non-existent node', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:completelyNonExistent', 'test:anyProperty');
      expect(rawValues).toHaveLength(0);
    });
  });

  describe('path traversal', () => {
    it('should traverse single property path', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:singleReference', 'test:childProperty']);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'child value' });
    });

    it('should traverse multiple property path', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:multipleReferences', 'test:childProperty']);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'child value' });
      expect(rawValues[1]).toEqual({ '@value': 'child value 2' });
    });

    it('should handle empty path', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', []);
      expect(rawValues).toHaveLength(0);
    });

    it('should handle path with non-existent intermediate property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:nonExistentProperty', 'test:anyProperty']);
      expect(rawValues).toHaveLength(0);
    });

    it('should handle path with empty array intermediate property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:emptyArray', 'test:anyProperty']);
      expect(rawValues).toHaveLength(0);
    });
  });

  describe('wide parameter behavior', () => {
    it('should return all values when wide=true (default)', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:multipleLiterals', true);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'value1' });
      expect(rawValues[1]).toEqual({ '@value': 'value2' });
    });

    it('should return all values when wide=false for single property', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:multipleLiterals', false);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'value1' });
      expect(rawValues[1]).toEqual({ '@value': 'value2' });
    });

    it('should respect wide parameter in path traversal', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:multipleReferences', 'test:childProperty'], true);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'child value' });
      expect(rawValues[1]).toEqual({ '@value': 'child value 2' });
    });

    it('should respect wide=false in path traversal', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:multipleReferences', 'test:childProperty'], false);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'child value' });
    });
  });

  describe('complex graph scenarios', () => {
    it('should traverse deep paths in complex graph', () => {
      const rawValues = getRawValues(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref', 'test:finalValue']);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'final result' });
    });

    it('should handle deep paths with wide=false', () => {
      const rawValues = getRawValues(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref', 'test:finalValue'], false);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'final result' });
    });
  });

  describe('wide graph scenarios', () => {
    it('should get all department names', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:university', ['test:departments', 'test:name']);
      expect(rawValues).toHaveLength(3);
      expect(rawValues[0]).toEqual({ '@value': 'Computer Science' });
      expect(rawValues[1]).toEqual({ '@value': 'Mathematics' });
      expect(rawValues[2]).toEqual({ '@value': 'Physics' });
    });

    it('should get all student names across departments', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:university', ['test:departments', 'test:students', 'test:name']);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'Alice Johnson' });
      expect(rawValues[1]).toEqual({ '@value': 'Bob Smith' });
    });

    it('should get all student ages across departments', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:university', ['test:departments', 'test:students', 'test:age']);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 20 });
      expect(rawValues[1]).toEqual({ '@value': 22 });
    });

    it('should get all research areas from professors', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:university', ['test:departments', 'test:professors', 'test:researchAreas']);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 'Machine Learning' });
      expect(rawValues[1]).toEqual({ '@value': 'Neural Networks' });
    });

    it('should traverse course prerequisites chain', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:course2', ['test:prerequisites', 'test:prerequisites', 'test:name']);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'Basic Mathematics' });
    });

    it('should handle wide=false for department traversal', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:university', ['test:departments', 'test:name'], false);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'Computer Science' });
    });

    it('should handle wide=false for student traversal', () => {
      const rawValues = getRawValues(wideTestGraph, 'test:university', ['test:departments', 'test:students', 'test:name'], false);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'Alice Johnson' });
    });
  });

  describe('edge cases', () => {
    it('should handle empty graph', () => {
      const emptyGraph = { nodes: {} };
      const rawValues = getRawValues(emptyGraph, 'any:uri', 'any:property');
      expect(rawValues).toHaveLength(0);
    });

    it('should handle undefined property values', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:nonExistentProperty');
      expect(rawValues).toHaveLength(0);
    });

    it('should handle node with undefined value', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:nonExistentNode', 'test:anyProperty');
      expect(rawValues).toHaveLength(0);
    });

    it('should handle mixed reference and literal values', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:mixedValues');
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({
        '@id': 'test:child1',
        '@type': ['test:ChildType'],
        'test:childProperty': [
          {
            '@value': 'child value',
          },
        ],
      });
      expect(rawValues[1]).toEqual({ '@value': 'literal value' });
    });
  });

  describe('type safety', () => {
    it('should work with generic type parameter', () => {
      const rawValues = getRawValues<{ '@value': string }>(basicTestGraph, 'test:root', 'test:singleLiteral');
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'test value' });
    });

    it('should handle different value types', () => {
      const rawValues = getRawValues<{ '@value': number }>(wideTestGraph, 'test:university', [
        'test:departments',
        'test:students',
        'test:age',
      ]);
      expect(rawValues).toHaveLength(2);
      expect(rawValues[0]).toEqual({ '@value': 20 });
      expect(rawValues[1]).toEqual({ '@value': 22 });
    });
  });

  describe('path parameter variations', () => {
    it('should accept string path', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', 'test:singleLiteral');
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'test value' });
    });

    it('should accept array path', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:singleReference', 'test:childProperty']);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'child value' });
    });

    it('should handle single element array path', () => {
      const rawValues = getRawValues(basicTestGraph, 'test:root', ['test:singleLiteral']);
      expect(rawValues).toHaveLength(1);
      expect(rawValues[0]).toEqual({ '@value': 'test value' });
    });
  });
});
