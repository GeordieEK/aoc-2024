// import { removeLevel, checkSafety } from "./day03.ts";
//
// describe("removeLevel", () => {
//   test("should return false for the given example", () => {
//     expect(
//       removeLevel(["56", "59", "57", "55", "55", "54", "52", "48"], 1),
//     ).toBe(false);
//   });
//
//   test("should return true for a sorted array", () => {
//     expect(removeLevel(["1", "3", "2", "4", "5"], 1)).toBe(true);
//   });
// });
//
// describe("checkSafety", () => {
//   test("should handle provided examples correctly", () => {
//     expect(checkSafety(["56", "59", "57", "55", "55", "54", "52", "48"])).toBe(
//       false,
//     );
//     expect(checkSafety(["1", "3", "2", "4", "5"])).toBe(false);
//     expect(checkSafety(["1", "3", "2", "4", "5"], true)).toBe(true);
//   });
//
//   const safeTests = [["90", "87", "89", "90", "92", "93", "95", "96"]];
//
//   test.each(safeTests.map((arr) => [arr]))(
//     "should return true for test %p",
//     (arr) => {
//       expect(checkSafety(arr, true)).toBe(true);
//     },
//   );
// });
