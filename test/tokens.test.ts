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

// 테마 블록이 덮어써도 되는 L2 컴포넌트 토큰. 목록에 없는 이름이 나오면 실패한다 —
// L1 40개는 여전히 모든 블록에 빠짐없이 있어야 한다.
const L2_OVERRIDES = new Set([
  "--button-radius",
  "--badge-radius",
  "--card-shadow",
  "--card-shadow-hover",
  "--dialog-shadow",
]);

const DEFAULT_LIGHT = ':root:not([data-theme]), [data-theme="default"]';
const DEFAULT_DARK = '[data-theme="default"][data-mode="dark"], :root:not([data-theme])[data-mode="dark"]';

describe("theme token parity", () => {
  const files = readdirSync(THEMES_DIR).filter((f) => f.endsWith(".css")).sort();
  const L1_BASELINE = [...parseThemeBlocks(read("default.css")).get(DEFAULT_LIGHT)!].filter(
    (t) => !L2_OVERRIDES.has(t),
  );

  it("ships one file per design theme", () => {
    expect(files).toEqual([
      "claymorphism.css", "default.css", "finance.css",
      "mocha-mousse.css", "neo-brutalism.css", "vintage-paper.css",
    ]);
  });

  it("default.css defines :root and a dark block", () => {
    const blocks = parseThemeBlocks(read("default.css"));
    expect([...blocks.keys()]).toEqual([
      DEFAULT_LIGHT,
      DEFAULT_DARK,
    ]);
  });

  it("every non-default theme file defines exactly its light and dark block", () => {
    for (const file of files.filter((f) => f !== "default.css")) {
      const name = file.replace(/\.css$/, "");
      expect({ file, selectors: [...parseThemeBlocks(read(file)).keys()] }).toEqual({
        file,
        selectors: [`[data-theme="${name}"]`, `[data-theme="${name}"][data-mode="dark"]`],
      });
    }
  });

  it("every block defines every L1 token", () => {
    expect(L1_BASELINE.length).toBe(40);
    for (const file of files) {
      for (const [selector, tokens] of parseThemeBlocks(read(file))) {
        const missing = L1_BASELINE.filter((t) => !tokens.has(t));
        expect({ file, selector, missing }).toEqual({ file, selector, missing: [] });
      }
    }
  });

  it("the only tokens beyond L1 are allowlisted L2 overrides", () => {
    const l1 = new Set(L1_BASELINE);
    for (const file of files) {
      for (const [selector, tokens] of parseThemeBlocks(read(file))) {
        const extra = [...tokens].filter((t) => !l1.has(t) && !L2_OVERRIDES.has(t));
        expect({ file, selector, extra }).toEqual({ file, selector, extra: [] });
      }
    }
  });

  it("light and dark blocks of one theme file carry identical token names", () => {
    for (const file of files) {
      const [light, dark] = [...parseThemeBlocks(read(file)).values()];
      const lightOnly = [...light].filter((t) => !dark.has(t));
      const darkOnly = [...dark].filter((t) => !light.has(t));
      expect({ file, lightOnly, darkOnly }).toEqual({ file, lightOnly: [], darkOnly: [] });
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
