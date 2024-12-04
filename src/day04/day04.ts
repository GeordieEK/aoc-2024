import { todo } from "node:test";
import { createReadLineInterface, readFromFile } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/3
const INPUT_FILE = "src/day04/day04.input";

// Check adjacent all directions, return number of XMAS found
export function xmas(
  iStart: number,
  jStart: number,
  matrix: string[][],
): number {
  let found = 0;
  const iBounds = matrix.length;
  const jBounds = matrix[0].length;

  // We can do a DFS to find XMAS
  function dfs(
    i: number,
    j: number,
    iDir: number,
    jDir: number,
    path: string,
  ): void {
    if (i < 0 || j < 0 || i === iBounds || j === jBounds) {
      // Out of bounds
      return;
    }
    const currChar = matrix[i][j];
    if (path.length >= 3 && path + currChar !== "XMAS") {
      return;
    }
    if (path + currChar === "XMAS") {
      // Ensure we don't double use sequence
      // Full XMAS sequence made, add 1 to found
      found += 1;
      path = "";
      return;
    }
    // recurse
    dfs(i + iDir, j + jDir, iDir, jDir, path + currChar);

    return;
  }
  const directions = [
    [0, -1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ];

  // Do the dfs in every direction
  for (const dir of directions) {
    dfs(iStart, jStart, dir[0], dir[1], "");
  }
  return found;
}

async function main() {
  // readLineInterface allows us to read the file line by line
  const readLineInterface = await createReadLineInterface(INPUT_FILE);
  // We want to build a matrix, so split every line into an array and add it
  // TODO: Fix type
  const matrix: any = [];
  for await (const line of readLineInterface) {
    const charArr = line.trim().split("");
    matrix.push(charArr);
  }
  let part1Res = 0;
  const matrixSize = matrix.length;

  // Now we have a matrix, lets iterate over it, when we find an X, we check surrounding for XMAS
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (matrix[i][j] === "X") {
        // BFS for XMAS, returns num found
        part1Res += xmas(i, j, matrix);
      }
    }
  }
  console.log("Part 1 res:", part1Res);

  let part2Res = 0;

  // Now we have a matrix, lets iterate over it, when we find an A, we can check for MAS cross
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (matrix[i][j] === "A") {
        // We can just check the pattern straight up
        if (
          i - 1 < 0 ||
          j - 1 < 0 ||
          i + 1 > matrixSize - 1 ||
          j + 1 > matrixSize - 1
        ) {
          continue;
        } else if (
          matrix[i - 1][j - 1] === "M" &&
          matrix[i - 1][j + 1] === "S" &&
          matrix[i + 1][j - 1] === "M" &&
          matrix[i + 1][j + 1] === "S"
        ) {
          part2Res += 1;
        } else if (
          matrix[i - 1][j - 1] === "S" &&
          matrix[i - 1][j + 1] === "M" &&
          matrix[i + 1][j - 1] === "S" &&
          matrix[i + 1][j + 1] === "M"
        ) {
          part2Res += 1;
        } else if (
          matrix[i - 1][j - 1] === "M" &&
          matrix[i - 1][j + 1] === "M" &&
          matrix[i + 1][j - 1] === "S" &&
          matrix[i + 1][j + 1] === "S"
        ) {
          part2Res += 1;
        } else if (
          matrix[i - 1][j - 1] === "S" &&
          matrix[i - 1][j + 1] === "S" &&
          matrix[i + 1][j - 1] === "M" &&
          matrix[i + 1][j + 1] === "M"
        ) {
          part2Res += 1;
        }
      }
    }
  }
  console.log("part 2 res", part2Res);
}

// Only run main() if this file is executed directly (for testing purposes)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main }; // Allow importing main for testing, if needed
