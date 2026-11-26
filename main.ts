import { mkdirSync, writeFileSync } from "node:fs";

const TEXT = `I didn't break it — I was conducting an unplanned resilience audit. Results: it was not resilient.`;

// Self-check: the sealed gate accepts at most 180 characters.
const MAX = 180;
if (TEXT.length < 1 || TEXT.length > MAX) {
  throw new Error(`entry length ${TEXT.length} is outside 1..${MAX}`);
}

const candidates = ["/output", "output"];
for (const dir of candidates) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/entry.txt`, TEXT, "utf8");
    break;
  } catch {
    // fall through to the next candidate location
  }
}
