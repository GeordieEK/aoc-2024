import { readFile, open } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { createReadStream } from "node:fs";

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
export async function createReadLineInterface(
  filePath: string,
): Promise<AsyncIterable<string>> {
  const fileStream = createReadStream(filePath, { encoding: "utf8" });

  return createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}
