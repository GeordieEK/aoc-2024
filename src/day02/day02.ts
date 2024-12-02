import { createReadLineInterface } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/2
const INPUT_FILE = "src/day02/day02.input";

export function removeLevel(arr: string[], idx: number): boolean {
  // The problem element must be around ours, as we're here because there's a problem
  for (let i = idx - 2; i < idx + 2; i++) {
    const newArr = [...arr];
    if (i < 0 || i == arr.length) {
      // Invalid index, skip
      continue;
    }
    // Remove the level at position i and check its safety
    newArr.splice(i, 1);
    if (checkSafety(newArr, false)) {
      return true;
    }
  }
  // No single removal made the array safe
  return false;
}

export function checkSafety(lineArr: string[], dampen?: boolean): boolean {
  const direction =
    parseInt(lineArr[0]) <= parseInt(lineArr[1]) ? "inc" : "dec";

  for (let i = 1; i < lineArr.length; i++) {
    const diff = parseInt(lineArr[i]) - parseInt(lineArr[i - 1]);
    if (isNaN(diff)) {
      throw new Error(`NaN result for ${lineArr[i]} - ${lineArr[i - 1]}`);
    }
    const validDiff =
      direction === "inc" ? diff > 0 && diff <= 3 : diff < 0 && diff >= -3;

    if (!validDiff) {
      if (dampen) {
        // Try removing a level
        return removeLevel(lineArr, i);
      }
      return false; // Not safe and no removal allowed
    }
  }
  return true; // Safe if no invalid differences were found
}

async function main() {
  // readLineInterface allows us to read the file line by line
  const readLineInterface = await createReadLineInterface(INPUT_FILE);
  // Counter for safe values
  let numSafe = 0;
  let numSafeWithDampen = 0;
  // Read the input line by line
  for await (const line of readLineInterface) {
    const lineArr = line.trim().split(/\s+/); // Split on one or more spaces
    // We need to check that everything is either increasing or decreasing, by 1>3
    const lineSet = new Set(lineArr);
    // If we have more than one dupe, no way it will pass safety
    if (Math.abs(lineSet.size - lineArr.length) > 1) {
      continue;
    }
    // NOTE: Part 1 check
    if (checkSafety(lineArr, false)) {
      numSafe += 1;
    }
    if (checkSafety(lineArr, true)) {
      numSafeWithDampen += 1;
    }
  }
  // NOTE: Answer to Part 1
  console.log("Number safe levels", numSafe);
  // NOTE: Answer to Part 2
  console.log("Number safe levels with dampen:", numSafeWithDampen);
  return numSafe;
}

// Only run main() if this file is executed directly (for testing purposes)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main }; // Allow importing main for testing, if needed
