import { getAllProperties } from './get-all-properties';

describe('getAllProperties', () => {
  it('should get all properties sorted', () => {
    const obj = {
      koala: 2,
      Harold: 8,
      foo: 'bar',
      pikachu: 'clefairy',
    };

    expect(getAllProperties(obj)).toEqual([
      'Harold',
      '__defineGetter__',
      '__defineSetter__',
      '__lookupGetter__',
      '__lookupSetter__',
      '__proto__',
      'constructor',
      'foo',
      'hasOwnProperty',
      'isPrototypeOf',
      'koala',
      'pikachu',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ]);
  });
});
