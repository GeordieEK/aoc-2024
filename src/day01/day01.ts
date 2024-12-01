import { createReadLineInterface } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/1
const INPUT_FILE = "src/day01/day01.input";

async function main() {
  // readLineInterface allows us to read the file line by line
  const readLineInterface = await createReadLineInterface(INPUT_FILE);
  const list1 = [],
    list2 = [];
  // Read the input line by line
  for await (const line of readLineInterface) {
    // Input data is 2 lists side by side
    // Text on left will be list1, right will be list2
    const lineArr = line.trim().split(/\s+/); // Split on one or more spaces
    list1.push(parseInt(lineArr[0]));
    list2.push(parseInt(lineArr[1]));
  }
  // Sort both lists, so we're matching smallest with smallest
  // TODO: Potential optimisation, could push values into heaps as they come in to sort
  // NOTE: This mutates the arrays, which generally isn't ideal but is fine for this use case.
  list1.sort();
  list2.sort();
  // We want the total distance between each pair of values from the sorted lists
  let totalDistance = 0;
  for (let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }

  // NOTE: This is the answer to part 1!
  console.log("Total distance:", totalDistance);

  // Part 2 wants us to get a similarity score by checking num appearances of items in list1 in list2
  // and multiplying their value by that count number

  // Build a count of num times a value appears in list2
  const list2Freqs: Record<number, number> = {};
  for (const num of list2) {
    if (!list2Freqs[num]) {
      list2Freqs[num] = 1;
    } else {
      list2Freqs[num] += 1;
    }
  }

  // Now we get similarity score by multiplying value in list1 by occurence number in list2, repeats are ok
  const similarityScore = list1.reduce((acc, curr) => {
    // If number doesn't appear in list 2, add 0
    if (!list2Freqs[curr]) {
      return acc + 0;
    }
    // Otherwise add its own value * num occurences
    return acc + curr * list2Freqs[curr];
  }, 0);

  // NOTE: This is the answer to part 2!
  console.log("Similarity score:", similarityScore);
}

main();
