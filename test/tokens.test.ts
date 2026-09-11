import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseThemeBlocks } from "../scripts/check-token-parity";

const THEMES_DIR = new URL("../src/styles/themes", import.meta.url).pathname;
const read = (f: string) => readFileSync(join(THEMES_DIR, f), "utf8");

describe("parseThemeBlocks", () => {
  it("maps each selector to the custom properties it defines", () => {
    const blocks = parseThemeBlocks(`
      :root { --a: 1; --b: 2; }
      [data-theme="x"][data-mode="dark"] { --a: 3; }
    `);
    expect([...blocks.keys()]).toEqual([':root', '[data-theme="x"][data-mode="dark"]']);
    expect(blocks.get(":root")).toEqual(new Set(["--a", "--b"]));
    expect(blocks.get('[data-theme="x"][data-mode="dark"]')).toEqual(new Set(["--a"]));
  });

  it("ignores var() references on the right-hand side", () => {
    const blocks = parseThemeBlocks(`:root { --a: var(--b); }`);
    expect(blocks.get(":root")).toEqual(new Set(["--a"]));
  });
});

describe("theme token parity", () => {
  const files = readdirSync(THEMES_DIR).filter((f) => f.endsWith(".css")).sort();

  it("ships one file per design theme", () => {
    expect(files).toEqual(["default.css", "finance.css"]);
  });

  it("default.css defines :root and a dark block", () => {
    const blocks = parseThemeBlocks(read("default.css"));
    expect([...blocks.keys()]).toEqual([
      ':root, [data-theme="default"]',
      '[data-theme="default"][data-mode="dark"], :root[data-mode="dark"]',
    ]);
  });

  it("every block defines exactly the same token names as default light", () => {
    const baseline = parseThemeBlocks(read("default.css")).get(':root, [data-theme="default"]')!;
    expect(baseline.size).toBe(40);
    for (const file of files) {
      for (const [selector, tokens] of parseThemeBlocks(read(file))) {
        const missing = [...baseline].filter((t) => !tokens.has(t));
        const extra = [...tokens].filter((t) => !baseline.has(t));
        expect({ file, selector, missing, extra }).toEqual({ file, selector, missing: [], extra: [] });
      }
    }
  });

  it("theme blocks never define derived shadows — index.css composes them once", () => {
    for (const file of files) {
      for (const tokens of parseThemeBlocks(read(file)).values()) {
        expect([...tokens].filter((t) => /^--shadow-(sm|md|lg)$/.test(t))).toEqual([]);
      }
    }
  });
});
