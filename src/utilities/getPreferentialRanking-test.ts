import { getPreferentialRanking } from "./getPreferentialRanking";

it("should return immediate majority", () => {
  const votes = [
    ["a", "b", "c", "d"],
    ["a", "d", "c", "b"],
    ["a", "b", "d", "c"]
  ];

  expect(getPreferentialRanking(votes)).toEqual({
    ranking: ["a", "b", "c", "d"],
    counts: {
      a: 3,
      b: 0,
      c: 0,
      d: 0
    }
  });
});

it("should return majority winner", () => {
  const votes = [
    ["c", "b", "a", "d"],
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    ["d", "b", "a", "c"],
    ["d", "b", "a", "c"]
  ];

  expect(getPreferentialRanking(votes)).toEqual({
    counts: {
      a: 3,
      b: 0,
      c: 1,
      d: 2
    },
    ranking: ["a", "d", "c", "b"]
  });
});
