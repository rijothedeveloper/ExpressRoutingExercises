const stat = require("./stat");

describe("test for stat", function () {
  let inputArray = {};

  beforeAll(function () {
    inputArray = [8, 7, 9, 7];
  });
  test("test for mean", function () {
    const mean = stat.calculateMean(inputArray);
    expect(mean).toEqual(7);
  });

  test("test for median", function () {
    const mean = stat.calculateMedian(inputArray);
    expect(mean).toEqual(8);
  });

  test("test for mode", function () {
    const mean = stat.calculateMode(inputArray);
    expect(mean).toEqual(7);
  });
});
