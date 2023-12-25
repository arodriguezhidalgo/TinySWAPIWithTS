import { reachAPI } from "../src/index";

describe("testing index file", () => {
  test("SWAPI should return some default fields that we can then read.", async () => {
    const a = await reachAPI();
    expect(Object.keys(a)).toEqual([
      "people",
      "planets",
      "films",
      "species",
      "vehicles",
      "starships",
    ]);
  });
});
