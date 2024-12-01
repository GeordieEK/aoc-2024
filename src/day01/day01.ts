import { createReadLineInterface } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/1
const INPUT_FILE = "src/day01/day01.input";

async function calculateTotalDistance(
  list1: number[],
  list2: number[],
): Promise<number> {
  const sortedList1 = [...list1].sort();
  const sortedList2 = [...list2].sort();
  return sortedList1.reduce(
    (acc, val, idx) => acc + Math.abs(val - sortedList2[idx]),
    0,
  );
}

async function calculateSimilarityScore(
  list1: number[],
  list2: number[],
): Promise<number> {
  // Build a count of num times a value appears in list2
  const freqMap: Record<number, number> = {};
  for (const num of list2) {
    if (!freqMap[num]) {
      freqMap[num] = 1;
    } else {
      freqMap[num] += 1;
    }
  }
  // Now we get similarity score by multiplying value in list1 by occurence number in list2, repeats are ok
  const similarityScore = list1.reduce(
    // If number isn't in freqMap, value is 0
    (acc, val) => acc + (freqMap[val] || 0) * val,
    0,
  );
  return similarityScore;
}

// TODO: Potential optimisation, could push values into heaps as they come in, instead of sorting them in calculateTotalDistance
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
  const totalDistance = await calculateTotalDistance(list1, list2);
  // NOTE: This is the answer to part 1!
  console.log("Total distance:", totalDistance);

  // Part 2 wants us to get a similarity score by checking num appearances of items in list1 in list2
  // and multiplying their value by that count number
  const similarityScore = await calculateSimilarityScore(list1, list2);
  // NOTE: This is the answer to part 2!
  console.log("Similarity score:", similarityScore);
}

main();
