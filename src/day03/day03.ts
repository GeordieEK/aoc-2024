import { createReadLineInterface, readFromFile } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/3
const INPUT_FILE = "src/day03/day03.input";

// Search forwards for a do or don't up until the last index
function runMul(str: string, mulIdx: number) {
  // Run loop forwards and get whatever is last before the index
  let doIdx = 0;
  let dontIdx = -1;
  const doRegex = RegExp(/do\(\)/i, "g");
  const dontRegex = RegExp(/don't\(\)/i, "g");
  let matchArray;
  let currIdx = 0;
  // do loop
  while ((matchArray = doRegex.exec(str)) !== null && currIdx < mulIdx) {
    // In case we have jumped ahead
    if (doRegex.lastIndex < mulIdx) {
      doIdx = doRegex.lastIndex;
    }
    currIdx = doRegex.lastIndex;
  }
  // dont loop
  currIdx = 0;
  while ((matchArray = dontRegex.exec(str)) !== null && currIdx < mulIdx) {
    // In case we have jumped ahead
    if (dontRegex.lastIndex < mulIdx) {
      dontIdx = dontRegex.lastIndex;
    }
    currIdx = dontRegex.lastIndex;
  }
  return doIdx > dontIdx;
}

// Evaluated using string from regex match
function mul(num1: number, num2: number) {
  return num1 * num2;
}

async function main() {
  const str = await readFromFile(INPUT_FILE);
  // We just have one line, we want to split it up into chars, matching this regex
  const mulRegex = RegExp(/mul\([0-9]+,[0-9]+\)/i, "g");
  let matchArray;

  if (!str) {
    throw new Error("Error reading from file");
  }

  let res = 0;

  while ((matchArray = mulRegex.exec(str)) !== null) {
    // We have found a mul, we need to search for a do(), a dont(), or start of string (counts as do())
    const runMulBool = runMul(str, mulRegex.lastIndex);

    // If last was a do, add to our result
    // NOTE: Remove this condition to get part 1 result
    if (runMulBool) {
      res += eval(matchArray[0]);
    }
  }
  // NOTE: Solution for Part 2, to make it part 1, remove the runMulBool check
  console.log(res);
  return res;
}

// Only run main() if this file is executed directly (for testing purposes)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main }; // Allow importing main for testing, if needed
