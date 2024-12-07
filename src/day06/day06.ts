import { createReadLineInterface, readFromFile } from "../utils/utils.ts";

// Problem from: https://adventofcode.com/2024/day/3
const INPUT_FILE = "src/day06/day06.input";

let outOfBounds = false;
// Directions are up, right, down, left in [r,c] array
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
// Just simpler to use global guardPos and score
let guardPos: number[];
let part1Res = 0;
let dirIdx = 0; // Index that dictates direction guard is going
let mapSize: number;
const map: string[][] = [];
const seen = new Set();

// Description
// Part 1:
// Guard is '^' and starts facing up
// Guard turns right when hits an obstacle '#'
// Every step guard takes, increment result by 1
// Guard always has to turn right

// Walks forward until hits an obstacle, or escapes then returns currPos
function walk() {
  // Check for out of bounds, if guard gets out of map, we're finished
  while (!outOfBounds) {
    const dir = directions[dirIdx % 4];
    const nextPos = [guardPos[0] + dir[0], guardPos[1] + dir[1]];
    // Check bounds for nextPos
    outOfBounds =
      nextPos[0] < 0 ||
      nextPos[1] < 0 ||
      nextPos[0] === mapSize ||
      nextPos[1] === mapSize;
    if (outOfBounds) {
      return;
    } else if (map[nextPos[0]][nextPos[1]] === "#") {
      // turn, but don't update where the guard is
      dirIdx += 1;
    } else {
      // If in bounds, add a step and update where the guard is
      // Answer only cares about distinct positions
      const key = `${nextPos[0]}:${nextPos[1]}`;
      seen.add(key);
      guardPos = nextPos;
    }
  }
}

function findCycle(startingPos: number[]): number {
  // Add our starting position to seen
  const cycleKey = `${startingPos[0]}:${startingPos[1]}:-1:0`;
  const visited = new Set([cycleKey]);
  while (!outOfBounds) {
    const dir = directions[dirIdx % 4];
    const nextPos = [guardPos[0] + dir[0], guardPos[1] + dir[1]];
    // Check bounds for nextPos
    outOfBounds =
      nextPos[0] < 0 ||
      nextPos[1] < 0 ||
      nextPos[0] === mapSize ||
      nextPos[1] === mapSize;
    if (outOfBounds) {
      return 0;
    } else if (map[nextPos[0]][nextPos[1]] === "#") {
      // turn, but don't update where the guard is
      dirIdx += 1;
    } else {
      // If in bounds, add a step and update where the guard is
      // It's a cycle if we're in same spot in same direction
      const cycleKey = `${nextPos[0]}:${nextPos[1]}:${dir[0]}:${dir[1]}`;
      if (visited.has(cycleKey)) {
        return 1;
      }
      // If not cycle, keep moving
      visited.add(cycleKey);
      guardPos = nextPos;
    }
  }
  return 0;
}

async function main() {
  // readLineInterface allows us to read the file line by line
  const readLineInterface = await createReadLineInterface(INPUT_FILE);
  // We want to build a matrix, so split every line into an array and add it
  for await (const line of readLineInterface) {
    const charArr = line.trim().split("");
    map.push(charArr);
  }
  mapSize = map.length;

  // Get guard index
  for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
      if (map[i][j] === "^") {
        guardPos = [i, j];
      }
    }
  }
  const startingPos = [...guardPos];
  console.log("guard starting pos", guardPos);
  // Starting pos is counted
  const key = `${guardPos[0]}:${guardPos[1]}`;
  seen.add(key);

  // Walk handles part 1, because we're using globals (naughty!) if we run it before part 2, it'll corrupt part 2
  // walk();
  console.log("Part 1 res:", seen.size);

  let part2Res = 0;
  // We're just going to trial every obstacle spot and see if it finds a cycle
  for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
      if (map[i][j] !== "^" && map[i][j] !== "#") {
        // Add an obstacle, look for cycle, then set it back after
        map[i][j] = "#";
        // Globals really messed me up here, woopsie
        outOfBounds = false;
        guardPos = startingPos;
        dirIdx = 0;
        part2Res += findCycle(startingPos);
        map[i][j] = ".";
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
