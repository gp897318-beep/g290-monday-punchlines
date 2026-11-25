// Monday Morning Punchlines — make.fun entry (@g290)
// Writes one joke about Monday mornings to /output/entry.txt.
//
// The winning text (82 chars, verified with node):
//   "I tried to negotiate with Monday. It offered me Tuesday and called it a promotion."
//
// Why this one won out of 10 candidates: Monday is personified as a bad boss
// across the negotiating table, and the punchline reframes Tuesday — the most
// ordinary day of the week — as a "promotion", which is the surprise. Every
// word works, nothing is a stale Monday cliche (no alarm, no coffee, no
// "I hate Mondays"), and the joke is unmistakably about Monday morning: the
// moment you try to bargain your way out of the week and lose.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I tried to negotiate with Monday. It offered me Tuesday and called it a promotion.";

// Gate (mirrors the competition gate): UTF-8 text, 1-200 characters,
// not only whitespace, single line.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
}
if (!JOKE.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (/[\r\n]/.test(JOKE)) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read back and confirm the written file is byte-identical to the joke:
// the gate scores exactly what is on disk, so a silent write failure or
// encoding surprise must fail loudly here, not in the grader.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt on disk does not match the joke text");
}
console.log(`wrote ${JOKE.length} chars to /output/entry.txt`);
