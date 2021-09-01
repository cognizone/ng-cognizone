import { of } from 'rxjs';

import { isInstanceOf } from './is-instance-of';

class A {}

class B {}

describe('Operator: isInstanceOf', () => {
  test('should fire subscription', () => {
    const spy = jest.fn();
    of(new A()).pipe(isInstanceOf(A)).subscribe(spy);
    expect(spy).toHaveBeenCalled();
  });

  test('should not fire subscription', () => {
    const spy = jest.fn();
    of(new B()).pipe(isInstanceOf(A)).subscribe(spy);
    expect(spy).not.toHaveBeenCalled();
  });
});
