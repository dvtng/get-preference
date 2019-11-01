import { getRanking } from "../getRanking";

it("should return immediate majority", () => {
  const votes = [
    ["a", "b", "c", "d"],
    ["a", "d", "c", "b"],
    ["a", "b", "d", "c"]
  ];

  // a = 12
  // b = 7
  // c = 5
  // d = 6

  expect(getRanking(votes)).toEqual([["a", 12], ["b", 7], ["d", 6], ["c", 5]]);
});

it("should return majority winner in second preference", () => {
  const votes = [
    ["c", "b", "a", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["d", "b", "a", "c"],
    ["b", "d", "a", "c"]
  ];

  // a = 14
  // b = 16
  // c = 10
  // d = 10

  expect(getRanking(votes)).toEqual([
    ["b", 16],
    ["a", 14],
    ["c", 10],
    ["d", 10]
  ]);
});
