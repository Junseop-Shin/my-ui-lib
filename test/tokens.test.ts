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
// L1 40개는 여전히 모든 L1 블록에 빠짐없이 있어야 한다.
const L2_OVERRIDES = new Set([
  "--button-radius",
  "--badge-radius",
  "--card-shadow",
  "--card-shadow-hover",
  "--dialog-shadow",
]);

// default.css만 블록이 넷이다. L1은 조건 없는 :root 바닥값으로 두고(모르는 data-theme 값도
// 여기로 떨어진다), default에만 걸어야 하는 L2 오버라이드는 별도 블록으로 뗐다.
const DEFAULT_L1_LIGHT = ":root";
const DEFAULT_L1_DARK = ':root[data-mode="dark"]';
const DEFAULT_L2_LIGHT = ':root:not([data-theme]), [data-theme="default"]';
const DEFAULT_L2_DARK = '[data-theme="default"][data-mode="dark"], :root:not([data-theme])[data-mode="dark"]';
const L2_ONLY_BLOCKS = new Set([DEFAULT_L2_LIGHT, DEFAULT_L2_DARK]);

describe("theme token parity", () => {
  const files = readdirSync(THEMES_DIR).filter((f) => f.endsWith(".css")).sort();
  // :root 바닥값 블록은 이제 L1만 담는다 — 걸러낼 것이 없다.
  const L1_BASELINE = [...parseThemeBlocks(read("default.css")).get(DEFAULT_L1_LIGHT)!];

  it("ships one file per design theme", () => {
    expect(files).toEqual([
      "claymorphism.css", "default.css", "finance.css",
      "mocha-mousse.css", "neo-brutalism.css", "vintage-paper.css",
    ]);
  });

  // 바닥값 블록에 [data-theme] 조건이 다시 붙으면 여기서 잡힌다. 조건부가 되는 순간
  // 모르는 data-theme 값에서 L1이 통째로 비고, --space가 비면 @theme inline의 --spacing까지
  // 비어 소비자 앱의 p-4 · gap-* 가 전부 0px로 계산된다.
  it("default.css defines an unconditional :root floor plus default-only L2 blocks", () => {
    const blocks = parseThemeBlocks(read("default.css"));
    expect([...blocks.keys()]).toEqual([
      DEFAULT_L1_LIGHT,
      DEFAULT_L1_DARK,
      DEFAULT_L2_LIGHT,
      DEFAULT_L2_DARK,
    ]);
  });

  it("default.css's L2 blocks carry only the allowlisted overrides", () => {
    const blocks = parseThemeBlocks(read("default.css"));
    for (const selector of L2_ONLY_BLOCKS) {
      expect({ selector, tokens: [...blocks.get(selector)!].sort() }).toEqual({
        selector,
        tokens: [...L2_OVERRIDES].sort(),
      });
    }
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

  it("every L1 block defines every L1 token", () => {
    expect(L1_BASELINE.length).toBe(40);
    for (const file of files) {
      for (const [selector, tokens] of parseThemeBlocks(read(file))) {
        if (L2_ONLY_BLOCKS.has(selector)) continue;
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

  // 블록은 light · dark 짝으로 이어 쓴다. default.css는 L1 짝과 L2 짝, 둘 다 검사한다.
  it("light and dark blocks of one theme file carry identical token names", () => {
    for (const file of files) {
      const entries = [...parseThemeBlocks(read(file))];
      expect({ file, blocks: entries.length % 2 }).toEqual({ file, blocks: 0 });
      for (let i = 0; i < entries.length; i += 2) {
        const [[lightSel, light], [darkSel, dark]] = [entries[i], entries[i + 1]];
        const lightOnly = [...light].filter((t) => !dark.has(t));
        const darkOnly = [...dark].filter((t) => !light.has(t));
        expect({ file, lightSel, darkSel, lightOnly, darkOnly }).toEqual({
          file, lightSel, darkSel, lightOnly: [], darkOnly: [],
        });
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
