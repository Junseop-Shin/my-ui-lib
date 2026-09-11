// jsdom은 @import한 CSS를 계산하지 않으므로 Playwright로 진짜 브라우저를 쓴다.
// vitest.config.ts의 'tokens' 프로젝트가 test/**/*.test.ts를 node 환경으로 돌린다.
import { existsSync, mkdtempSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const SB = new URL("../storybook-static/assets", import.meta.url).pathname;
const cssFile = existsSync(SB)
  ? readdirSync(SB)
      .filter((f) => f.endsWith(".css"))
      .map((f) => ({ f, size: statSync(join(SB, f)).size }))
      .sort((a, b) => b.size - a.size)[0]?.f
  : undefined;

let browser: Browser;
let pageUrl: string;

// 빌드 산출물이 없으면 실패시키지 않고 건너뛴다.
// vitest 기본 리포터는 실행된 테스트가 0인 파일의 console 출력을 감추므로 stderr로 직접 쓴다.
if (!cssFile) {
  process.stderr.write(
    "[theme-render] storybook-static/assets에 CSS가 없어 건너뛴다. npm run build-storybook 먼저.\n",
  );
}
const suite = cssFile ? describe : describe.skip;

suite("테마 적용", () => {
  beforeAll(async () => {
    const dir = mkdtempSync(join(tmpdir(), "theme-render-"));
    const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="file://${join(SB, cssFile!)}">
<body><div id="probe" style="background: var(--background); color: var(--foreground)">x</div>
<button data-ui="button" class="h-button-md rounded-button">b</button></body>`;
    writeFileSync(join(dir, "index.html"), html);
    pageUrl = `file://${join(dir, "index.html")}`;
    browser = await chromium.launch();
  }, 60_000);

  afterAll(async () => {
    await browser?.close();
  });

  it("data-theme을 바꾸면 --background가 바뀐다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    const read = () =>
      page.evaluate(() => getComputedStyle(document.getElementById("probe")!).backgroundColor);
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "default"));
    const a = await read();
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "finance"));
    const b = await read();
    expect(a).not.toBe(b);
    await page.close();
  }, 30_000);

  it("data-mode를 바꾸면 같은 테마 안에서도 바뀐다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "default");
      document.documentElement.setAttribute("data-mode", "light");
    });
    const light = await page.evaluate(
      () => getComputedStyle(document.getElementById("probe")!).backgroundColor,
    );
    await page.evaluate(() => document.documentElement.setAttribute("data-mode", "dark"));
    const dark = await page.evaluate(
      () => getComputedStyle(document.getElementById("probe")!).backgroundColor,
    );
    expect(light).not.toBe(dark);
    await page.close();
  }, 30_000);

  it("L2 유틸리티가 실제 크기로 해석된다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    const h = await page.evaluate(
      () => getComputedStyle(document.querySelector('[data-ui="button"]')!).height,
    );
    expect(h).toBe("40px"); // --button-h-md 2.5rem
    await page.close();
  }, 30_000);
});
