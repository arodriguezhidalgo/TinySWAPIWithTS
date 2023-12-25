import { add, reachAPI } from '../src/index';

describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(add('')).toBe(0);
  });

  test('SWAPI should return some default fields that we can then read.', async () => {
    const a = await reachAPI();    
    expect(Object.keys(a)).toEqual(["people", "planets", "films", "species", "vehicles", "starships"]);
  })
});
