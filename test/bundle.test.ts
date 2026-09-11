// 배포 번들에 CJS가 섞였는지 본다. 소비자(Next.js)는 ESM 번들을 그대로 불러오므로
// rolldown의 require 심(shim)이 남으면 하이드레이션 시점에 바로 터진다.
// vitest.config.ts의 'tokens' 프로젝트가 test/**/*.test.ts를 node 환경으로 돌린다.
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const ESM = new URL("../dist/my-ui-lib.es.js", import.meta.url).pathname;
const built = existsSync(ESM);

// 빌드 산출물이 없으면 실패시키지 않고 건너뛴다.
// vitest 기본 리포터는 실행된 테스트가 0인 파일의 console 출력을 감추므로 stderr로 직접 쓴다.
if (!built) {
  process.stderr.write(
    "[bundle] dist/my-ui-lib.es.js가 없어 건너뛴다. npm run build 먼저.\n",
  );
}
const suite = built ? describe : describe.skip;
const code = built ? readFileSync(ESM, "utf8") : "";

suite("ESM 번들", () => {
  // 이 테스트가 잡는 결함: rollupOptions.external이 정확히 일치하는 문자열 목록이라
  // react/jsx-runtime과 dependencies 전부가 번들에 들어가고, 그것들이 끌고 온 CJS 파일
  // 때문에 rolldown이 require 심을 심던 상태. 소비자 앱에서
  // "Calling 'require' for \"react\" in an environment that doesn't expose the 'require' function"로 터진다.
  it("require를 쓰지 않는다", () => {
    const hits = code.match(/\brequire\b/g) ?? [];
    expect(hits.length, `번들에 require가 ${hits.length}개 남아 있다`).toBe(0);
  });

  it("CommonJS 소스를 인라인하지 않는다", () => {
    const inlined = [...code.matchAll(/[\w@/.-]*\/cjs\/[\w.-]+/g)].map((m) => m[0]);
    expect([...new Set(inlined)]).toEqual([]);
  });
});
