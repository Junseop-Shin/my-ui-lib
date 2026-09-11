// 테마 × 모드 전 블록의 foreground/background 대비율을 잰다. Task 5가 docs/themes.md에 기록한다.
import { execSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import { resolveStorybookCss } from "./resolve-storybook-css";

const THEMES = ["default", "finance", "vintage-paper", "mocha-mousse", "neo-brutalism", "claymorphism"];
const MODES = ["light", "dark"];

function luminance([r, g, b]: number[]): number {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fg: number[], bg: number[]): number {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

const SB = new URL("../storybook-static/assets", import.meta.url).pathname;
if (!existsSync(SB)) {
  console.error("storybook-static이 없다. npm run build-storybook을 먼저 실행한다...");
  execSync("npm run build-storybook", { stdio: "inherit" });
}
const cssPath = resolveStorybookCss(SB);

const dir = mkdtempSync(join(tmpdir(), "contrast-"));
writeFileSync(
  join(dir, "index.html"),
  `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="file://${cssPath}">
   <body><div id="p" style="background: var(--background); color: var(--foreground)">x</div>
   <div id="m" style="background: var(--background); color: var(--muted-foreground)">x</div></body>`,
);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${join(dir, "index.html")}`);

console.log("| 테마 | 모드 | fg/bg | muted-fg/bg |");
console.log("|---|---|---|---|");
for (const theme of THEMES) {
  for (const mode of MODES) {
    await page.evaluate(([t, m]) => {
      document.documentElement.setAttribute("data-theme", t);
      document.documentElement.setAttribute("data-mode", m);
    }, [theme, mode]);
    const [fg, bg, mfg] = await page.evaluate(() => {
      // 계산된 색은 oklch()/oklab()으로 직렬화된다. 캔버스에 찍어 sRGB로 되돌린다.
      // tsx(esbuild)의 keepNames가 page.evaluate 안의 이름 있는 함수를 __name으로 감싸
      // 브라우저에서 깨지므로, 이 클로저 안에는 보조 함수를 두지 않는다.
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      const p = getComputedStyle(document.getElementById("p")!);
      const mm = getComputedStyle(document.getElementById("m")!);
      const out: number[][] = [];
      for (const color of [p.color, p.backgroundColor, mm.color]) {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        out.push([...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3));
      }
      return out;
    });
    console.log(`| ${theme} | ${mode} | ${ratio(fg, bg).toFixed(2)} | ${ratio(mfg, bg).toFixed(2)} |`);
  }
}
await browser.close();
