import { getPairOfPathsAndPageTypes } from '../helpers';

describe('getPairOfPathsAndPageTypes test utils helper', () => {
  it('should return the specific array', () => {
    expect(getPairOfPathsAndPageTypes()).toMatchInlineSnapshot(`
      Array [
        Array [
          "/notes",
          "notes",
        ],
        Array [
          "/twitters",
          "twitters",
        ],
        Array [
          "/articles",
          "articles",
        ],
      ]
    `);
  });
});
