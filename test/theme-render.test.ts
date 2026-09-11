// jsdom은 @import한 CSS를 계산하지 않으므로 Playwright로 진짜 브라우저를 쓴다.
// vitest.config.ts의 'tokens' 프로젝트가 test/**/*.test.ts를 node 환경으로 돌린다.
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { resolveStorybookCss } from "../scripts/resolve-storybook-css";

const SB = new URL("../storybook-static/assets", import.meta.url).pathname;
const sbExists = existsSync(SB);

// 빌드 산출물이 없으면 실패시키지 않고 건너뛴다.
// vitest 기본 리포터는 실행된 테스트가 0인 파일의 console 출력을 감추므로 stderr로 직접 쓴다.
if (!sbExists) {
  process.stderr.write(
    "[theme-render] storybook-static/assets에 CSS가 없어 건너뛴다. npm run build-storybook 먼저.\n",
  );
}
const suite = sbExists ? describe : describe.skip;
// sbExists일 때만 이 지점에 닿는다 — 마커가 없으면(청킹이 바뀌면) 여기서 크게 실패한다.
const cssPath = sbExists ? resolveStorybookCss(SB) : undefined;

let browser: Browser;
let pageUrl: string;

suite("테마 적용", () => {
  beforeAll(async () => {
    const dir = mkdtempSync(join(tmpdir(), "theme-render-"));
    const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="file://${cssPath!}">
<body><div id="probe" style="background: var(--background); color: var(--foreground)">x</div>
<button data-ui="button" class="h-button-md rounded-button">b</button>
<div id="card" data-ui="card" class="rounded-card shadow-card">c</div>
<div id="pad" class="p-4">p</div></body>`;
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

  // 이 테스트가 잡는 결함: L2 토큰이 리터럴이라 테마가 색만 바꾸고 형태는 못 바꾸던 상태.
  it("테마는 색뿐 아니라 형태도 바꾼다 — neo-brutalism은 각지고 default는 알약이다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    const readShape = () =>
      page.evaluate(() => ({
        radius: getComputedStyle(document.querySelector('[data-ui="button"]')!)
          .borderTopLeftRadius,
        shadow: getComputedStyle(document.getElementById("card")!).boxShadow,
      }));

    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "default"));
    const base = await readShape();
    await page.evaluate(() =>
      document.documentElement.setAttribute("data-theme", "neo-brutalism"),
    );
    const neo = await readShape();

    expect(base.radius).toBe("9999px");
    expect(neo.radius).toBe("0px");
    expect(neo.shadow).not.toBe(base.shadow);
    await page.close();
  }, 30_000);

  // 이 테스트가 잡는 결함: default.css의 L1 블록을 :root:not([data-theme])로 좁혀
  // 모르는 data-theme 값(오타 · localStorage 잔재 · 손으로 쓴 anti-FOUC 스크립트)에서
  // 바닥값이 통째로 사라지던 상태. --space가 비면 @theme inline의 --spacing까지 비어서
  // 소비자 앱의 p-4 · gap-* 같은 간격 유틸리티가 전부 0px로 계산된다.
  it("모르는 data-theme에서도 :root 바닥값이 남는다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "bogus"));
    const v = await page.evaluate(() => ({
      radius: getComputedStyle(document.documentElement).getPropertyValue("--radius").trim(),
      btnRadius: getComputedStyle(document.querySelector('[data-ui="button"]')!)
        .borderTopLeftRadius,
      pad: getComputedStyle(document.getElementById("pad")!).paddingTop,
    }));
    expect(v.radius).not.toBe("");
    expect(v.btnRadius).toBe("12px"); // --radius 0.75rem이 실제로 풀린다
    expect(v.pad).toBe("16px"); // --spacing = --space 0.25rem
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
