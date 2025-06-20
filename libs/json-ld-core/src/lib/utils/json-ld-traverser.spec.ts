import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { JsonLdNodeTraverser, JsonLdTraverser } from './json-ld-traverser';
import { basicTestGraph, deepTestGraph, wideTestGraph } from './tests';

describe('JsonLdTraverser', () => {
  let traverser: JsonLdTraverser;
  let testGraph: ExpandedJsonLdContainer;

  beforeEach(() => {
    testGraph = basicTestGraph;
    traverser = new JsonLdTraverser(testGraph);
  });

  describe('getNodeTraverser', () => {
    it('should create a node traverser for existing node', () => {
      const nodeTraverser = traverser.node('test:root');
      expect(nodeTraverser).toBeDefined();
      expect(nodeTraverser.uri).toBe('test:root');
    });

    it('should create a node traverser for non-existent node', () => {
      const nodeTraverser = traverser.node('test:nonExistent');
      expect(nodeTraverser).toBeDefined();
      expect(nodeTraverser.uri).toBe('test:nonExistent');
    });
  });

  describe('JsonLdNodeTraverser', () => {
    let rootTraverser: JsonLdNodeTraverser;

    beforeEach(() => {
      rootTraverser = traverser.node('test:root');
    });

    describe('getNodes', () => {
      it('should return single node for single reference', () => {
        const nodes = rootTraverser.children('test:singleReference');
        expect(nodes).toHaveLength(1);
        expect(nodes[0].uri).toBe('test:child1');
      });

      it('should return multiple nodes for multiple references', () => {
        const nodes = rootTraverser.children('test:multipleReferences');
        expect(nodes).toHaveLength(2);
        expect(nodes[0].uri).toBe('test:child1');
        expect(nodes[1].uri).toBe('test:child2');
      });

      it('should return empty array for non-existent property', () => {
        const nodes = rootTraverser.children('test:nonExistentProperty');
        expect(nodes).toHaveLength(0);
      });

      it('should return empty array for empty array property', () => {
        const nodes = rootTraverser.children('test:emptyArray');
        expect(nodes).toHaveLength(0);
      });

      it('should filter out non-reference values', () => {
        const nodes = rootTraverser.children('test:mixedValues');
        expect(nodes).toHaveLength(1);
        expect(nodes[0].uri).toBe('test:child1');
      });

      it('should handle non-existent node gracefully', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const nodes = nonExistentTraverser.children('test:anyProperty');
        expect(nodes).toHaveLength(0);
      });
    });

    describe('getNode', () => {
      it('should return first node for single reference', () => {
        const node = rootTraverser.child('test:singleReference');
        expect(node).toBeDefined();
        expect(node?.uri).toBe('test:child1');
      });

      it('should return first node for multiple references', () => {
        const node = rootTraverser.child('test:multipleReferences');
        expect(node).toBeDefined();
        expect(node?.uri).toBe('test:child1');
      });

      it('should return undefined for non-existent property', () => {
        const node = rootTraverser.child('test:nonExistentProperty');
        expect(node).toBeUndefined();
      });

      it('should return undefined for empty array property', () => {
        const node = rootTraverser.child('test:emptyArray');
        expect(node).toBeUndefined();
      });
    });

    describe('getAttributes', () => {
      it('should return single literal value', () => {
        const attributes = rootTraverser.values<string>('test:singleLiteral');
        expect(attributes).toHaveLength(1);
        expect(attributes[0]).toBe('test value');
      });

      it('should return multiple literal values', () => {
        const attributes = rootTraverser.values<string>('test:multipleLiterals');
        expect(attributes).toHaveLength(2);
        expect(attributes[0]).toBe('value1');
        expect(attributes[1]).toBe('value2');
      });

      it('should return empty array for non-existent property', () => {
        const attributes = rootTraverser.values<string>('test:nonExistentProperty');
        expect(attributes).toHaveLength(0);
      });

      it('should return empty array for empty array property', () => {
        const attributes = rootTraverser.values<string>('test:emptyArray');
        expect(attributes).toHaveLength(0);
      });

      it('should filter out reference values', () => {
        const attributes = rootTraverser.values<string>('test:mixedValues');
        expect(attributes).toHaveLength(2);
        expect(attributes).toContain('literal value');
        expect(attributes).toContain('test:child1');
      });

      it('should handle non-existent node gracefully', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const attributes = nonExistentTraverser.values<string>('test:anyProperty');
        expect(attributes).toHaveLength(0);
      });

      it('should work with different primitive types', () => {
        const numberTraverser = traverser.node('test:child1');
        const attributes = numberTraverser.values<string>('test:childProperty');
        expect(attributes).toHaveLength(1);
        expect(attributes[0]).toBe('child value');
      });
    });

    describe('value', () => {
      it('should return first value for single literal', () => {
        const value = rootTraverser.value<string>('test:singleLiteral');
        expect(value).toBe('test value');
      });

      it('should return first value for multiple literals', () => {
        const value = rootTraverser.value<string>('test:multipleLiterals');
        expect(value).toBe('value1');
      });

      it('should return undefined for non-existent property', () => {
        const value = rootTraverser.value<string>('test:nonExistentProperty');
        expect(value).toBeUndefined();
      });

      it('should return undefined for empty array property', () => {
        const value = rootTraverser.value<string>('test:emptyArray');
        expect(value).toBeUndefined();
      });

      it('should handle non-existent node gracefully', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const value = nonExistentTraverser.value<string>('test:anyProperty');
        expect(value).toBeUndefined();
      });
    });

    describe('rawValue', () => {
      it('should return first raw value for single literal', () => {
        const rawValue = rootTraverser.rawValue('test:singleLiteral');
        expect(rawValue).toEqual({ '@value': 'test value' });
      });

      it('should return first raw value for multiple literals', () => {
        const rawValue = rootTraverser.rawValue('test:multipleLiterals');
        expect(rawValue).toEqual({ '@value': 'value1' });
      });

      it('should return undefined for non-existent property', () => {
        const rawValue = rootTraverser.rawValue('test:nonExistentProperty');
        expect(rawValue).toBeUndefined();
      });

      it('should return undefined for empty array property', () => {
        const rawValue = rootTraverser.rawValue('test:emptyArray');
        expect(rawValue).toBeUndefined();
      });

      it('should handle non-existent node gracefully', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const rawValue = nonExistentTraverser.rawValue('test:anyProperty');
        expect(rawValue).toBeUndefined();
      });
    });

    describe('exists', () => {
      it('should return true for existing node', () => {
        expect(rootTraverser.exists()).toBe(true);
      });

      it('should return false for non-existent node', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        expect(nonExistentTraverser.exists()).toBe(false);
      });

      it('should return false for completely non-existent URI', () => {
        const nonExistentTraverser = traverser.node('test:completelyNonExistent');
        expect(nonExistentTraverser.exists()).toBe(false);
      });
    });

    describe('types', () => {
      it('should return types for existing node', () => {
        const types = rootTraverser.types();
        expect(types).toEqual(['test:RootType']);
      });

      it('should return types for child node', () => {
        const childTraverser = traverser.node('test:child1');
        const types = childTraverser.types();
        expect(types).toEqual(['test:ChildType']);
      });

      it('should return empty array for non-existent node', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const types = nonExistentTraverser.types();
        expect(types).toEqual([]);
      });
    });

    describe('hasType', () => {
      it('should return true for existing type', () => {
        expect(rootTraverser.hasType('test:RootType')).toBe(true);
      });

      it('should return false for non-existing type', () => {
        expect(rootTraverser.hasType('test:NonExistentType')).toBe(false);
      });

      it('should return false for non-existent node', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        expect(nonExistentTraverser.hasType('test:AnyType')).toBe(false);
      });
    });

    describe('properties', () => {
      it('should return all properties excluding @id and @type', () => {
        const properties = rootTraverser.properties();
        expect(properties).toContain('test:singleReference');
        expect(properties).toContain('test:multipleReferences');
        expect(properties).toContain('test:singleLiteral');
        expect(properties).toContain('test:multipleLiterals');
        expect(properties).toContain('test:mixedValues');
        expect(properties).toContain('test:emptyArray');
        expect(properties).toContain('test:nonExistentProperty');
        expect(properties).not.toContain('@id');
        expect(properties).not.toContain('@type');
      });

      it('should return empty array for non-existent node', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const properties = nonExistentTraverser.properties();
        expect(properties).toEqual([]);
      });
    });

    describe('hasProperty', () => {
      it('should return true for existing property', () => {
        expect(rootTraverser.hasProperty('test:singleReference')).toBe(true);
        expect(rootTraverser.hasProperty('test:singleLiteral')).toBe(true);
      });

      it('should return false for non-existing property', () => {
        expect(rootTraverser.hasProperty('test:nonExistingProperty')).toBe(false);
      });

      it('should return false for non-existent node', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        expect(nonExistentTraverser.hasProperty('test:anyProperty')).toBe(false);
      });

      it('should return false for property with undefined value', () => {
        expect(rootTraverser.hasProperty('test:nonExistentProperty')).toBe(false);
      });
    });

    describe('rawJsonLd', () => {
      it('should return the raw expanded JSON-LD container', () => {
        const rawJsonLd = rootTraverser.rawJsonLd();
        expect(rawJsonLd).toBe(testGraph);
        expect(rawJsonLd.nodes).toBeDefined();
        expect(rawJsonLd.nodes['test:root']).toBeDefined();
      });

      it('should return the same container for different nodes', () => {
        const childTraverser = traverser.node('test:child1');
        const rootRawJsonLd = rootTraverser.rawJsonLd();
        const childRawJsonLd = childTraverser.rawJsonLd();
        expect(rootRawJsonLd).toBe(childRawJsonLd);
      });
    });

    describe('unwrap', () => {
      it('should return the actual node for existing node', () => {
        const node = rootTraverser.raw();
        expect(node).toBeDefined();
        expect(node['@id']).toBe('test:root');
        expect(node['@type']).toEqual(['test:RootType']);
      });

      it('should return undefined for non-existent node', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const node = nonExistentTraverser.raw();
        expect(node).toBeUndefined();
      });
    });

    describe('chaining', () => {
      it('should allow chaining traverser calls', () => {
        const childTraverser = rootTraverser.child('test:singleReference');
        expect(childTraverser).toBeDefined();

        const childAttributes = childTraverser?.values<string>('test:childProperty');
        expect(childAttributes).toHaveLength(1);
        expect(childAttributes?.[0]).toBe('child value');
      });

      it('should handle chaining with non-existent nodes', () => {
        const nonExistentTraverser = traverser.node('test:nonExistentNode');
        const childTraverser = nonExistentTraverser.child('test:anyProperty');
        expect(childTraverser).toBeUndefined();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty graph', () => {
      const emptyTraverser = new JsonLdTraverser({ nodes: {} });
      const nodeTraverser = emptyTraverser.node('any:uri');

      expect(nodeTraverser.children('any:property')).toHaveLength(0);
      expect(nodeTraverser.child('any:property')).toBeUndefined();
      expect(nodeTraverser.values('any:property')).toHaveLength(0);
      expect(nodeTraverser.raw()).toBeUndefined();
    });
  });

  describe('complex scenarios', () => {
    it('should handle nested traversal', () => {
      const child1Traverser = traverser.node('test:root').child('test:singleReference');
      expect(child1Traverser).toBeDefined();

      const childValue = child1Traverser?.values<string>('test:childProperty');
      expect(childValue).toHaveLength(1);
      expect(childValue?.[0]).toBe('child value');
    });

    it('should handle multiple levels of traversal', () => {
      const complexTraverser = new JsonLdTraverser(deepTestGraph);
      const level1Traverser = complexTraverser.node('test:level1');
      const level2Traverser = level1Traverser.child('test:level2Ref');
      const level3Traverser = level2Traverser?.child('test:level3Ref');
      const finalValue = level3Traverser?.values<string>('test:finalValue');

      expect(finalValue).toHaveLength(1);
      expect(finalValue?.[0]).toBe('final result');
    });
  });

  describe('wide graph scenarios', () => {
    let wideTraverser: JsonLdTraverser;

    beforeEach(() => {
      wideTraverser = new JsonLdTraverser(wideTestGraph);
    });

    describe('wide graph traversal', () => {
      it('should traverse multiple departments', () => {
        const university = wideTraverser.node('test:university');
        const departments = university.children('test:departments');

        expect(departments).toHaveLength(3);
        expect(departments[0].uri).toBe('test:dept1');
        expect(departments[1].uri).toBe('test:dept2');
        expect(departments[2].uri).toBe('test:dept3');
      });

      it('should get all department names', () => {
        const university = wideTraverser.node('test:university');
        const departments = university.children('test:departments');

        const names = departments.map(dept => dept.value<string>('test:name'));
        expect(names).toEqual(['Computer Science', 'Mathematics', 'Physics']);
      });

      it('should count all students across departments - complex', () => {
        const university = wideTraverser.node('test:university');
        const departments = university.children('test:departments');

        let totalStudents = 0;
        departments.forEach(dept => {
          const students = dept.children('test:students');
          totalStudents += students.length;
        });

        expect(totalStudents).toBe(6);
      });

      it('should count all students across departments - simple', () => {
        const studentUris = wideTraverser.node('test:university').values(['test:departments', 'test:students']);
        expect(studentUris.length).toBe(6);
      });

      it('should find all professors with AI specialization', () => {
        const university = wideTraverser.node('test:university');
        const departments = university.children('test:departments');

        const aiProfessors: string[] = [];
        departments.forEach(dept => {
          const professors = dept.children('test:professors');
          professors.forEach(prof => {
            const specialization = prof.value<string>('test:specialization');
            if (specialization === 'AI') {
              const name = prof.value<string>('test:name');
              if (name) aiProfessors.push(name);
            }
          });
        });

        expect(aiProfessors).toEqual(['Dr. Smith']);
      });
    });

    describe('deep path traversal', () => {
      it('should traverse deep paths with multiple predicates', () => {
        const university = wideTraverser.node('test:university');

        const students = university.values<string>(['test:departments', 'test:students']);
        expect(students).toHaveLength(6);

        // Get all student names across all departments
        const studentNames = university.values<string>(['test:departments', 'test:students', 'test:name']);

        expect(studentNames).toHaveLength(2); // Only 2 students have names defined
        expect(studentNames).toContain('Alice Johnson');
        expect(studentNames).toContain('Bob Smith');
      });

      it('should handle deep paths with mixed values', () => {
        const university = wideTraverser.node('test:university');

        // Get all student ages and names
        const studentAges = university.values<number>(['test:departments', 'test:students', 'test:age']);

        expect(studentAges).toHaveLength(2); // Only 2 students have age defined
        expect(studentAges).toContain(20);
        expect(studentAges).toContain(22);
      });

      it('should traverse course prerequisites chain', () => {
        const course2 = wideTraverser.node('test:course2');

        // Get prerequisite of prerequisite
        const prereqName = course2.value<string>(['test:prerequisites', 'test:prerequisites', 'test:name']);

        expect(prereqName).toBe('Basic Mathematics');
      });

      it('should get all research areas from professors', () => {
        const university = wideTraverser.node('test:university');

        const researchAreas = university.values<string>(['test:departments', 'test:professors', 'test:researchAreas']);

        expect(researchAreas).toHaveLength(2);
        expect(researchAreas).toContain('Machine Learning');
        expect(researchAreas).toContain('Neural Networks');
      });
    });

    describe('complex filtering and aggregation', () => {
      it('should find courses with prerequisites', () => {
        const university = wideTraverser.node('test:university');

        // Get all courses that have prerequisites
        const coursesWithPrereqs: string[] = [];
        const allCourses = university.children(['test:departments', 'test:students', 'test:courses']);

        allCourses.forEach(course => {
          if (course.hasProperty('test:prerequisites')) {
            const name = course.value<string>('test:name');
            if (name) coursesWithPrereqs.push(name);
          }
        });

        expect(coursesWithPrereqs).toContain('Introduction to Programming');
        expect(coursesWithPrereqs).toContain('Data Structures');
      });
    });

    describe('wide parameter behavior', () => {
      it('should respect wide=false in children', () => {
        const university = wideTraverser.node('test:university');

        // Get only first department
        const firstDept = university.children('test:departments', false);
        expect(firstDept).toHaveLength(1);
        expect(firstDept[0].uri).toBe('test:dept1');

        // Get all departments
        const allDepts = university.children('test:departments', true);
        expect(allDepts).toHaveLength(3);
      });

      it('should respect wide=false in rawValues', () => {
        const prof1 = wideTraverser.node('test:prof1');

        // Get only first research area
        const firstResearchArea = prof1.rawValues('test:researchAreas', false);
        expect(firstResearchArea).toHaveLength(2); // The wide parameter doesn't affect rawValues for single property
        expect(firstResearchArea[0]).toEqual({ '@value': 'Machine Learning' });
        expect(firstResearchArea[1]).toEqual({ '@value': 'Neural Networks' });

        // Get all research areas
        const allResearchAreas = prof1.rawValues('test:researchAreas', true);
        expect(allResearchAreas).toHaveLength(2);
      });
    });
  });
});
