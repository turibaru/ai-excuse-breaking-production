import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry point: copy the committed entry.txt to MAKEFUN_OUTPUT_DIR/entry.txt.
// No rendering, no network, no writes to the repo. Exits non-zero on failure.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
const repoDir = dirname(fileURLToPath(import.meta.url));
const src = join(repoDir, "entry.txt");
const dest = join(outDir, "entry.txt");
try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(src, dest);
} catch (err) {
  console.error("failed to write entry.txt:", err);
  process.exit(1);
}
