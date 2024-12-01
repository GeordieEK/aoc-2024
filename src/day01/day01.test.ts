import {
  calculateTotalDistance,
  calculateSimilarityScore,
} from "../day01/day01.ts";

// Given example
const list1 = [3, 4, 2, 1, 3, 3];
const list2 = [4, 3, 5, 3, 9, 3];

test("calculateTotalDistance", () => {
  expect(calculateTotalDistance(list1, list2)).toBe(11);
});

test("calculateSimilarityScore", () => {
  expect(calculateSimilarityScore(list1, list2)).toBe(31);
});
