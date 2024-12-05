import { createReadLineInterface, readFromFile } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/3
const INPUT_FILE = "src/day05/day05.input";

async function main() {
  // readLineInterface allows us to read the file line by line
  const readLineInterface = await createReadLineInterface(INPUT_FILE);
  // First part, line format is 'number | number'
  // Rules map is {currentNum: enforcedLeadingNums}
  const rules: any = {};
  const updates: any = [];
  let readingRules = true;
  for await (const line of readLineInterface) {
    if (!line) {
      console.log("Now reading updates");
      readingRules = false;
      continue;
    }
    if (readingRules) {
      const ruleArr = line.trim().split("|");
      // We want to look up what should be before a number
      if (ruleArr[1] in rules) {
        // Add to set
        rules[ruleArr[1]].add(ruleArr[0]);
      } else {
        rules[ruleArr[1]] = new Set([ruleArr[0]]);
      }
    } else {
      const updatesArr = line.trim().split(",");
      updates.push(updatesArr);
    }
  }
  console.log("rules", rules);
  // For part 2 we want just invalidUpdates

  let part1Res = 0;
  let part2Res = 0;
  // Now check the updates, see if they violate the ordering rules with the rules map
  // If we read them backwards and one of the numbers that should be before current has already been seen, fail
  for (const update of updates) {
    const seen = new Set();
    let valid = true;
    // console.log("update", update);
    for (let i = update.length - 1; i >= 0; i--) {
      // Read backwards, check for violations, then put in set
      const leadingNums = rules[update[i]];
      // Number we've just seen
      seen.add(update[i]);
      // If intersection, we've seen something before
      if (leadingNums && seen.intersection(leadingNums).size > 0) {
        // Rule has failed, skip over this update (break out of backwards loop)
        valid = false;
        break;
      }
    }
    if (valid) {
      // Get middle number
      const middle = Math.floor(update.length / 2);
      const middleNum = parseInt(update[middle]);
      // console.log(parseInt(update[middle]));
      part1Res += middleNum;
    } else {
      // We want to sort it according to rules
      update.sort((a: string, b: string) => {
        if (!rules[a]) return -1;
        return rules[a].has(b) ? 1 : -1;
      });
      console.log("sorted update", update);

      // One sorted, add it to part 2 result
      const middle = Math.floor(update.length / 2);
      const middleNum = parseInt(update[middle]);
      // console.log(parseInt(update[middle]));
      part2Res += middleNum;
    }
  }

  console.log("Part 1 res:", part1Res);
  console.log("Part 2 res:", part2Res);
}

// Only run main() if this file is executed directly (for testing purposes)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main }; // Allow importing main for testing, if needed
