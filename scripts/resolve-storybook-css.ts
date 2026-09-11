// test/theme-render.test.ts와 scripts/measure-contrast.ts가 공유하는 CSS 파일 선택 로직.
// Storybook은 청크를 여러 개로 쪼갤 수 있어 "제일 큰 .css"를 그대로 믿으면, 청킹이 바뀌었을 때
// 엉뚱한 파일을 골라 놓고도 그럴듯한 값을 계속 낸다. 그래서 고른 파일이 실제 테마 CSS인지
// 알려진 마커 문자열로 검증하고, 아니면 검토한 파일 목록과 함께 크게 실패시킨다.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// 프로덕션 빌드는 속성 선택자의 따옴표를 지운다([data-theme=finance]) — 그래서
// 리터럴 문자열이 아니라 따옴표가 있어도 없어도 맞는 정규식으로 마커를 찾는다.
const MARKER_RE = /\[data-theme=["']?finance["']?\]/;

export function resolveStorybookCss(assetsDir: string): string {
  if (!existsSync(assetsDir)) {
    throw new Error(`${assetsDir}가 없다. npm run build-storybook 먼저.`);
  }

  const candidates = readdirSync(assetsDir)
    .filter((f) => f.endsWith(".css"))
    .map((f) => ({ f, size: statSync(join(assetsDir, f)).size }))
    .sort((a, b) => b.size - a.size);

  if (candidates.length === 0) {
    throw new Error(`${assetsDir}에 .css 파일이 없다. npm run build-storybook 먼저.`);
  }

  const chosen = candidates[0];
  const path = join(assetsDir, chosen.f);
  const content = readFileSync(path, "utf8");
  if (!MARKER_RE.test(content)) {
    throw new Error(
      `${assetsDir}에서 가장 큰 CSS 파일(${chosen.f})에 마커(${MARKER_RE})가 없다 — ` +
        `Storybook의 청킹이 바뀌어 엉뚱한 파일을 골랐을 수 있다. 검토한 파일: ` +
        candidates.map((c) => `${c.f} (${c.size}B)`).join(", "),
    );
  }

  return path;
}
