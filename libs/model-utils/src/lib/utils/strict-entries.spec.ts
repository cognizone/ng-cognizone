import { strictEntries } from './strict-entries';

describe('strictEntries', () => {
  it('should call native Object.entries', () => {
    jest.spyOn(Object, 'entries');
    const obj = {};

    strictEntries(obj);

    expect(Object.entries).toHaveBeenCalledWith(obj);
  });
});
