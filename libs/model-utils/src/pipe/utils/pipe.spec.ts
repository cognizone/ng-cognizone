import { pipe } from './pipe';

describe('pipe', () => {
  it('should return the initial value when no operations are provided', () => {
    expect(pipe(5)).toBe(5);
    expect(pipe('test')).toBe('test');
    expect(pipe({ foo: 'bar' })).toEqual({ foo: 'bar' });
  });

  it('should pipe through a single function', () => {
    const result = pipe(5, v => v + 1);
    expect(result).toBe(6);
  });

  it('should pipe through multiple functions', () => {
    const addOne = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const toString = (x: number) => x.toString();

    const result = pipe(5, addOne, double, toString);
    expect(result).toBe('12');
  });

  it('should support functions with additional arguments', () => {
    const multiply = (factor: number) => (x: number) => x * factor;
    const add = (y: number) => (x: number) => x + y;
    const result = pipe(5, multiply(2), add(3));
    expect(result).toBe(13);
  });

  it('should handle mixed regular functions and functions with args', () => {
    const addOne = (x: number) => x + 1;
    const multiply = (factor: number) => (x: number) => x * factor;
    const toString = (x: number) => x.toString();

    const result = pipe(5, addOne, multiply(2), toString);
    expect(result).toBe('12');
  });

  it('should handle complex type transformations', () => {
    interface User {
      name: string;
      age: number;
    }

    const getUser = (): User => ({ name: 'John', age: 30 });
    const addTitle = (title: string) => (user: User) => ({ ...user, name: `${title} ${user.name}` });
    const getGreeting = (user: User) => `Hello ${user.name}!`;

    const result = pipe(123, getUser, addTitle('Mr.'), getGreeting);

    expect(result).toBe('Hello Mr. John!');
  });

  it('should handle array transformations', () => {
    const numbers = [1, 2, 3, 4, 5];
    const double = (arr: number[]) => arr.map(x => x * 2);
    const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
    const format = (prefix: string) => (num: number) => `${prefix}${num}`;

    const result = pipe(numbers, double, sum, format('Total: '));

    expect(result).toBe('Total: 30');
  });

  it('should handle object transformations', () => {
    interface Input {
      firstName: string;
      lastName: string;
    }

    const input: Input = { firstName: 'John', lastName: 'Doe' };

    const combineNames = ({ firstName, lastName }: Input) => ({
      fullName: `${firstName} ${lastName}`,
    });

    const addGreeting = (greetingText: string) => (obj: { fullName: string }) => ({
      ...obj,
      greeting: `${greetingText} ${obj.fullName}`,
    });

    const result = pipe(input, combineNames, addGreeting('Hello,'));

    expect(result).toEqual({
      fullName: 'John Doe',
      greeting: 'Hello, John Doe',
    });
  });

  it('should handle null and undefined values', () => {
    const handleNull = (value: null | undefined | number) => value ?? 0;
    const addOne = (x: number) => x + 1;
    const toString = (x: number) => x.toString();

    const result1 = pipe(null, handleNull, addOne, toString);
    const result2 = pipe(undefined, handleNull, addOne, toString);

    expect(result1).toBe('1');
    expect(result2).toBe('1');
  });
});
