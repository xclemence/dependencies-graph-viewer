import { NameFilterPipe } from './name-filter.pipe';

describe('NameFilterPipe', () => {

  it('make no filter with undefined parameter', () => {
    const pipe = new NameFilterPipe();

    const inputValues = [
      {name: 'test'},
      {name: 'test1'},
      {name: 'test2'}
    ];

    const result = pipe.transform(inputValues, '');

    expect(result).toEqual(inputValues);
  });

  it('should filter list with parameter', () => {
    const pipe = new NameFilterPipe();

    const inputValues = [
      {name: 'hello'},
      {name: 'test1'},
      {name: 'test2'}
    ];

    const result = pipe.transform(inputValues, 'test');

    expect(result).toEqual([
      {name: 'test1'},
      {name: 'test2'}
    ]);
  });

  it('should return no value', () => {
    const pipe = new NameFilterPipe();

    const inputValues = [
      {name: 'test1'},
      {name: 'test2'}
    ];

    const result = pipe.transform(inputValues, 'hello');

    expect(result).toEqual([ ]);
  });
});
