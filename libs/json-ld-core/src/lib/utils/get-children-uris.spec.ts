import { ExpandedJsonLdContainer } from '../models';
import { getChildrenUris } from './get-children-uris';
import { basicTestGraph, deepTestGraph, wideTestGraph } from './tests';

describe('getChildrenUris', () => {
  describe('basic functionality', () => {
    it('should return single child URI for single reference', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:singleReference');
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:child1');
    });

    it('should return multiple child URIs for multiple references', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:multipleReferences');
      expect(uris).toHaveLength(2);
      expect(uris).toContain('test:child1');
      expect(uris).toContain('test:child2');
    });

    it('should return empty array for non-existent property', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:nonExistentProperty');
      expect(uris).toHaveLength(0);
    });

    it('should return empty array for empty array property', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:emptyArray');
      expect(uris).toHaveLength(0);
    });

    it('should filter out non-reference values', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:mixedValues');
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:child1');
    });

    it('should return empty array for non-existent node', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:nonExistentNode', 'test:anyProperty');
      expect(uris).toHaveLength(0);
    });

    it('should return empty array for completely non-existent URI', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:completelyNonExistent', 'test:anyProperty');
      expect(uris).toHaveLength(0);
    });
  });

  describe('path traversal', () => {
    it('should traverse single property path', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:singleReference');
      expect(uris).toEqual(['test:child1']);
    });

    it('should traverse multiple property path', () => {
      const uris = getChildrenUris(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref']);
      expect(uris).toEqual(['test:level3']);
    });

    it('should handle empty path array', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', []);
      expect(uris).toHaveLength(0);
    });

    it('should handle path with non-existent intermediate nodes', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', ['test:singleReference', 'test:nonExistentProperty']);
      expect(uris).toHaveLength(0);
    });

    it('should handle path with empty intermediate results', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', ['test:emptyArray', 'test:anyProperty']);
      expect(uris).toHaveLength(0);
    });
  });

  describe('wide parameter behavior', () => {
    it('should return all values when wide=true (default)', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:multipleReferences', true);
      expect(uris).toHaveLength(2);
      expect(uris).toContain('test:child1');
      expect(uris).toContain('test:child2');
    });

    it('should return only first value when wide=false', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:multipleReferences', false);
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:child1');
    });

    it('should return single value when wide=false and only one reference', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:singleReference', false);
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:child1');
    });

    it('should return empty array when wide=false and no references', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:emptyArray', false);
      expect(uris).toHaveLength(0);
    });
  });

  describe('complex scenarios', () => {
    it('should handle deep path traversal with wide=true', () => {
      const uris = getChildrenUris(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref'], true);
      expect(uris).toEqual(['test:level3']);
    });

    it('should handle deep path traversal with wide=false', () => {
      const uris = getChildrenUris(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref'], false);
      expect(uris).toEqual(['test:level3']);
    });

    it('should handle path with multiple branches', () => {
      // Create a test case where a path has multiple branches
      const multiBranchGraph = {
        nodes: {
          'test:root': {
            '@id': 'test:root',
            'test:branch1': [{ '@id': 'test:node1' }],
            'test:branch2': [{ '@id': 'test:node2' }],
          },
          'test:node1': {
            '@id': 'test:node1',
            'test:target': [{ '@id': 'test:target1' }],
          },
          'test:node2': {
            '@id': 'test:node2',
            'test:target': [{ '@id': 'test:target2' }],
          },
        },
      } as unknown as ExpandedJsonLdContainer;

      const uris = getChildrenUris(multiBranchGraph, 'test:root', ['test:branch1', 'test:target'], true);
      expect(uris).toEqual(['test:target1']);
    });
  });

  describe('wide graph scenarios', () => {
    it('should traverse university departments', () => {
      const uris = getChildrenUris(wideTestGraph, 'test:university', 'test:departments');
      expect(uris).toHaveLength(3);
      expect(uris).toContain('test:dept1');
      expect(uris).toContain('test:dept2');
      expect(uris).toContain('test:dept3');
    });

    it('should traverse university departments with wide=false', () => {
      const uris = getChildrenUris(wideTestGraph, 'test:university', 'test:departments', false);
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:dept1');
    });

    it('should traverse deep path to students', () => {
      const uris = getChildrenUris(wideTestGraph, 'test:university', ['test:departments', 'test:students']);
      expect(uris).toHaveLength(6);
      expect(uris).toContain('test:student1');
      expect(uris).toContain('test:student2');
      expect(uris).toContain('test:student3');
      expect(uris).toContain('test:student4');
      expect(uris).toContain('test:student5');
      expect(uris).toContain('test:student6');
    });

    it('should traverse deep path to students with wide=false', () => {
      const uris = getChildrenUris(wideTestGraph, 'test:university', ['test:departments', 'test:students'], false);
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:student1');
    });

    it('should traverse course prerequisites chain', () => {
      const uris = getChildrenUris(wideTestGraph, 'test:course2', ['test:prerequisites', 'test:prerequisites']);
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:course0');
    });

    it('should handle path with no results', () => {
      const uris = getChildrenUris(wideTestGraph, 'test:course0', 'test:prerequisites');
      expect(uris).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty graph', () => {
      const emptyGraph = { nodes: {} } as unknown as ExpandedJsonLdContainer;
      const uris = getChildrenUris(emptyGraph, 'test:any', 'test:property');
      expect(uris).toHaveLength(0);
    });

    it('should handle node with undefined value', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:nonExistentProperty');
      expect(uris).toHaveLength(0);
    });

    it('should handle mixed array with references and literals', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:mixedValues');
      expect(uris).toHaveLength(1);
      expect(uris[0]).toBe('test:child1');
    });

    it('should handle array with only literals', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:singleLiteral');
      expect(uris).toHaveLength(0);
    });

    it('should handle array with only literals and wide=false', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:singleLiteral', false);
      expect(uris).toHaveLength(0);
    });
  });

  describe('Many type handling', () => {
    it('should handle string path', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', 'test:singleReference');
      expect(uris).toEqual(['test:child1']);
    });

    it('should handle array path', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', ['test:singleReference']);
      expect(uris).toEqual(['test:child1']);
    });

    it('should handle empty array path', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', []);
      expect(uris).toHaveLength(0);
    });

    it('should handle path with single string in array', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', ['test:singleReference']);
      expect(uris).toEqual(['test:child1']);
    });
  });

  describe('recursive path traversal', () => {
    it('should handle single level recursion', () => {
      const uris = getChildrenUris(deepTestGraph, 'test:level1', 'test:level2Ref');
      expect(uris).toEqual(['test:level2']);
    });

    it('should handle multi-level recursion', () => {
      const uris = getChildrenUris(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref']);
      expect(uris).toEqual(['test:level3']);
    });

    it('should handle recursion with wide=false', () => {
      const uris = getChildrenUris(deepTestGraph, 'test:level1', ['test:level2Ref', 'test:level3Ref'], false);
      expect(uris).toEqual(['test:level3']);
    });

    it('should handle recursion with intermediate empty results', () => {
      const uris = getChildrenUris(basicTestGraph, 'test:root', ['test:emptyArray', 'test:anyProperty']);
      expect(uris).toHaveLength(0);
    });
  });
});
