import { readFile, open } from "node:fs/promises";
import { createInterface } from "node:readline/promises";

// Reads from file using fs promises
export async function readFromFile(filePath: string) {
  try {
    const data = await readFile(filePath, {
      encoding: "utf8",
    });
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Returns a readLine interface for a given file
export async function readFileLineByLine(filePath: string) {
  const fileHandle = await open(filePath);
  // Create a stream from some character device.
  const fileStream = fileHandle.createReadStream({ autoClose: true });

  const readLineInterface = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return readLineInterface;
}
