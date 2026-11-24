import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const destination = join(outputDir, "POST.json");

try {
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, destination);
} catch (error) {
  console.error(`Failed to copy POST.json from ${source} to ${destination}: ${error}`);
  process.exit(1);
}

let original: Buffer;
let copied: Buffer;
try {
  original = readFileSync(source);
  copied = readFileSync(destination);
} catch (error) {
  console.error(`Failed to read back POST.json for verification: ${error}`);
  process.exit(1);
}

if (!original.equals(copied)) {
  console.error(`Verification failed: ${destination} is not byte-identical to ${source}`);
  process.exit(1);
}
