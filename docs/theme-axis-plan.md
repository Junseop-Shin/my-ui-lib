# my-ui-lib 테마 축 구현 플랜 (스펙 1~2단계)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 컬러 모드와 디자인 테마를 두 축으로 나누고(`data-mode` × `data-theme`), 토큰을 L1(전역) · L2(컴포넌트) 두 층으로 세운 뒤, 레퍼런스 테마 6종을 갈아끼울 수 있게 만든다.

**Architecture:** 테마는 CSS 변수 블록 하나다. JS 오버라이드 장치를 새로 만들지 않는다. `index.css`가 L1 토큰을 `[data-theme]` × `[data-mode]` 블록으로 정의하고, L2 컴포넌트 토큰이 L1에서 파생되며, `@theme inline`이 그 L2 토큰을 Tailwind 이름공간에 매핑해 CVA가 네이티브 유틸리티(`rounded-button` `h-button-md`)로 부른다. `ThemeProvider`는 두 축을 각각 들고 `<html>`에 속성으로 꽂기만 한다.

**Tech Stack:** React 19 · TypeScript · Tailwind CSS v4 (`@theme inline`) · Base UI · CVA · Storybook 10 · vitest + @testing-library/react · Playwright (chromium)

**Spec:** `~/Documents/Work/Projects/design-kg/docs/plan.md` → "my-ui-lib 테마 축" 절. 이 플랜은 그 절 전체(두 축 분리 · 토큰 3층 · 레퍼런스 테마)를 구현한다. 실행자는 둘 다 읽는다.

## Global Constraints

- **두 축**: `<html data-theme="<디자인 테마>" data-mode="light|dark">`. `data-mode`는 항상 `light` 또는 `dark`로 해석된 값이며 `system`이 DOM에 들어가지 않는다.
- **디자인 테마 6종**: `default` · `finance` · `vintage-paper` · `mocha-mousse` · `neo-brutalism` · `claymorphism`. 각 테마가 light/dark 블록 한 쌍을 가지므로 토큰 블록은 12개다.
- **`default` × `light`는 현재 모습과 픽셀 단위로 같아야 한다.** 기존 소비자의 화면이 바뀌면 안 된다.
- **arbitrary value 금지**: `h-[var(--x)]` 같은 형태를 쓰지 않는다. `@theme inline` 매핑을 거쳐 네이티브 유틸리티로 부른다. **예외는 transition-duration 하나** — Tailwind v4에 `--duration-*` 이름공간이 없다. v4의 CSS 변수 축약 `duration-(--duration-normal)`을 쓴다(대괄호가 아니라 소괄호다).
- **Tailwind v4 이름공간 사실**: `--color-*` `--font-*` `--text-*` `--tracking-*` `--leading-*` `--spacing-*` `--radius-*` `--shadow-*` `--ease-*`는 이름공간이라 유틸리티를 생성한다. `--duration-*`은 이름공간이 아니다.
- **L2 대상 컴포넌트는 5개**: Button · Input · Card · Badge · Dialog. 나머지 49개는 건드리지 않는다.
- **`data-ui` 속성**: L2 대상 5개의 루트 요소에 `data-ui` · `data-variant` · `data-size`를 단다. design-kg의 `scripts/snapshot.ts`가 이 속성으로 요소를 수집한다.
- **새 JS 오버라이드 장치 금지.** 테마 전환은 `<html>` 속성 두 개를 바꾸는 것이 전부다.
- 버전: 공개 API(`ThemeProvider`/`useTheme`)가 바뀌므로 **1.0.0 → 2.0.0** 메이저 범프.
- 문서·커밋 설명은 한국어, 코드·식별자·파일명은 영어. Conventional Commits `type(scope): 한국어 설명`.
- 커밋은 브랜치 `feat/theme-axis`에서. main 직접 커밋 금지. 커밋 메시지 본문 끝에 `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`.
- 상대 import는 기존 관례대로 `@/` 별칭을 쓴다(`vite.config.ts` · `tsconfig.app.json`에 설정돼 있다).

## 파일 구조

```
my-ui-lib/
  src/styles/
    index.css          @theme inline 매핑 + L1/L2 토큰 블록 + base
    themes/            테마별 L1 블록 (index.css가 @import)
      default.css      :root(light) + [data-mode="dark"]
      finance.css
      vintage-paper.css
      mocha-mousse.css
      neo-brutalism.css
      claymorphism.css
  src/context/
    ThemeContext.tsx   ThemeProvider(theme, mode) + useTheme
  src/components/atoms/
    Button.tsx  Input.tsx  Card.tsx  Badge.tsx  Dialog.tsx   L2 참조 + data-ui
  .storybook/
    preview.ts         globalTypes 두 개 + 데코레이터
    preview-head.html  레퍼런스 테마 웹폰트
  scripts/
    check-token-parity.ts   테마 블록 간 토큰 키 일치 검사 (vitest가 호출)
    measure-contrast.ts     테마 12블록 대비율 측정 (Playwright)
  test/
    tokens.test.ts     토큰 파리티 (vitest, CSS 파싱)
    theme-provider.test.tsx  2축 + localStorage 마이그레이션 (jsdom)
    theme-render.test.ts     실제 렌더 적용 (Playwright)
  docs/
    theme-axis-plan.md  이 문서
    themes.md           테마 6종 소개 · 출처 · 대비율 기록
```

의존 순서: T1(L1 토큰 축) → T2(L2 + CVA + data-ui) → T3(ThemeProvider) → T4(Storybook) → T5(레퍼런스 4종) → T6(문서·버전).

---

### Task 1: L1 토큰 축 분리 + 확장 [Opus]

**Files:**
- Create: `src/styles/themes/default.css`, `src/styles/themes/finance.css`, `test/tokens.test.ts`, `scripts/check-token-parity.ts`
- Modify: `src/styles/index.css`
- Modify: `vitest.config.ts` (test include 경로)

**Interfaces:**
- Produces (이후 모든 태스크가 쓴다):
  - 셀렉터 규약: 테마 light 블록은 `[data-theme="<name>"]`, dark 블록은 `[data-theme="<name>"][data-mode="dark"]`. `default`의 L1 값은 조건 없는 `:root`와 `:root[data-mode="dark"]`에 둬서 모든 테마의 바닥값이 된다. `data-theme`이 없거나 모르는 값이어도 여기로 떨어진다. `[data-theme="default"]`에는 default 전용 L2 오버라이드만 둔다.
  - L1 토큰 이름(모든 테마 블록이 이 키를 빠짐없이 정의한다):
    - 색 25개: `--background` `--foreground` `--card` `--card-foreground` `--popover` `--popover-foreground` `--primary` `--primary-foreground` `--secondary` `--secondary-foreground` `--muted` `--muted-foreground` `--accent` `--accent-foreground` `--destructive` `--destructive-foreground` `--success` `--success-foreground` `--warning` `--warning-foreground` `--info` `--info-foreground` `--border` `--input` `--ring`
    - 형태: `--radius`
    - 타이포: `--font-family-sans` `--font-family-serif` `--font-family-mono` `--tracking-normal`
    - 공간: `--space` (기준 간격)
    - 그림자 6값: `--shadow-color` `--shadow-opacity` `--shadow-blur` `--shadow-spread` `--shadow-offset-x` `--shadow-offset-y`
    - 모션: `--duration-fast` `--duration-normal` `--ease`
    - `color-scheme`
  - 파생 그림자: `--shadow-sm` `--shadow-md` `--shadow-lg` (index.css가 6값에서 한 번만 조립; 테마 블록은 6값만 정의한다)
  - `export function parseThemeBlocks(css: string): Map<string, Set<string>>` (`scripts/check-token-parity.ts`) — 셀렉터 → 그 블록이 정의한 `--` 토큰 이름 집합

- [ ] **Step 1: 브랜치**

```bash
cd ~/Documents/Work/Projects/my-ui-lib && git checkout -b feat/theme-axis
```

- [ ] **Step 2: 현재 default light 값을 기록해 둔다**

`src/styles/index.css`의 `:root` 블록과 `.dark` 블록, `.finance` 블록의 값을 그대로 복사해 둘 것. 아래 Step 4~5에서 셀렉터만 바꿔 옮긴다. **값은 한 글자도 바꾸지 않는다** — `default` × `light`가 지금과 같아야 한다는 제약 때문이다.

기존에 없던 축은 아래 값으로 새로 넣는다(`default` 기준).

```
--font-family-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
--font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
--tracking-normal: 0em;
--space: 0.25rem;
--shadow-color: 0 0 0;
--shadow-opacity: 0.1;
--shadow-blur: 3px;
--shadow-spread: 0px;
--shadow-offset-x: 0px;
--shadow-offset-y: 1px;
--duration-fast: 120ms;
--duration-normal: 200ms;
--ease: cubic-bezier(0.4, 0, 0.2, 1);
```

기존 `:root`에 없는 색 토큰(`--info` `--info-foreground`)은 `tailwind.config.js`가 참조하고 있으나 CSS에는 없다. `default` light에 `--info: oklch(60% 0.15 240); --info-foreground: oklch(100% 0 0);`, dark에 `--info: oklch(68% 0.15 240); --info-foreground: oklch(100% 0 0);`으로 채운다.

`finance`의 dark 값은 현재 `.finance` 블록 값을 쓰고, light 블록은 같은 값을 쓰되 `--background: oklab(0.98 0 0)` `--foreground: oklab(0.15 -0.01 -0.02)` `--card: oklab(1 0 0)` `--card-foreground: oklab(0.15 -0.01 -0.02)` `--popover: oklab(1 0 0)` `--popover-foreground: oklab(0.15 -0.01 -0.02)` `--secondary: oklab(0.95 0 -0.01)` `--secondary-foreground: oklab(0.15 -0.01 -0.02)` `--muted: oklab(0.95 0 -0.01)` `--muted-foreground: oklab(0.45 0 -0.03)` `--accent: oklab(0.93 0 -0.01)` `--accent-foreground: oklab(0.30 -0.02 -0.08)` `--border: oklab(0.88 0 -0.01)` `--input: oklab(0.88 0 -0.01)` 로 바꾸고 `color-scheme: light`를 둔다. 나머지(primary/destructive/success/warning/info와 그 foreground, radius, 폰트, 공간, 그림자, 모션)는 dark와 같은 값을 쓴다.

- [ ] **Step 3: 실패하는 테스트**

`test/tokens.test.ts`:

```ts
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
```

- [ ] **Step 4: 실패 확인**

```bash
npm test -- tokens
```

Expected: FAIL — `Cannot find module '../scripts/check-token-parity'`.

`vitest.config.ts`에 `test/**/*.test.ts(x)`가 포함돼 있지 않으면(현재는 `src`만 볼 수 있다) include를 고친다:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    include: ["src/**/*.test.{ts,tsx}", "test/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

기존 `vitest.config.ts`의 설정(environment·setupFiles·alias)을 지우지 말고 include만 더한다. 기존 컴포넌트 테스트가 계속 통과해야 한다.

- [ ] **Step 5: 파서 구현**

`scripts/check-token-parity.ts`:

```ts
// CSS를 정규식으로 읽는다. 중첩 없는 평평한 블록만 다루므로 파서를 들이지 않는다.
export function parseThemeBlocks(css: string): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(stripped)) !== null) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    const tokens = new Set<string>();
    for (const decl of m[2].split(";")) {
      const name = decl.split(":")[0]?.trim();
      if (name?.startsWith("--")) tokens.add(name);
    }
    if (tokens.size > 0) out.set(selector, tokens);
  }
  return out;
}
```

- [ ] **Step 6: 테마 파일 작성**

`src/styles/themes/default.css` — 블록 두 개. 셀렉터는 테스트가 기대하는 문자열과 정확히 같아야 한다.

```css
/* default — 현재 my-ui-lib. Apple 계열. 값은 기존 index.css에서 그대로 옮긴 것이다. */
:root, [data-theme="default"] {
  --background: oklch(100% 0 0);
  --foreground: oklch(13% 0.004 285);
  /* … Step 2에서 기록한 나머지 색 · radius · 폰트 · tracking · space · shadow 6값 · motion … */
  color-scheme: light;
}

[data-theme="default"][data-mode="dark"], :root[data-mode="dark"] {
  /* … 기존 .dark 블록 값 + 새 축 … */
  color-scheme: dark;
}
```

`src/styles/themes/finance.css` — 블록 두 개, 셀렉터 `[data-theme="finance"]` / `[data-theme="finance"][data-mode="dark"]`.

**주의**: 새 축(폰트 3종·tracking·space·shadow 6값·motion)은 모든 블록이 빠짐없이 정의해야 파리티 테스트를 통과한다. `finance`의 폰트·모션은 `default`와 같은 값을 쓰고, 그림자는 `--shadow-color: 0 0 0; --shadow-opacity: 0.4; --shadow-blur: 6px; --shadow-spread: 0px; --shadow-offset-x: 0px; --shadow-offset-y: 2px;`로 둔다(어두운 테마라 더 진하게).

- [ ] **Step 7: index.css 재구성**

`src/styles/index.css`를 다음 순서로 바꾼다. 기존 `:root` · `.dark` · `.finance` 블록은 테마 파일로 옮겼으므로 **지운다**.

```css
@import "tailwindcss";

@import "./themes/default.css";
@import "./themes/finance.css";

/* ─── 파생 토큰 — 테마가 정의한 6값에서 그림자를 한 번만 조립한다 ─── */
:root {
  --shadow-sm: var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) var(--shadow-spread) rgb(var(--shadow-color) / var(--shadow-opacity));
  --shadow-md: var(--shadow-offset-x) calc(var(--shadow-offset-y) * 2) calc(var(--shadow-blur) * 2) var(--shadow-spread) rgb(var(--shadow-color) / var(--shadow-opacity));
  --shadow-lg: var(--shadow-offset-x) calc(var(--shadow-offset-y) * 4) calc(var(--shadow-blur) * 4) var(--shadow-spread) rgb(var(--shadow-color) / var(--shadow-opacity));
}

@theme inline {
  /* 색 — 기존 매핑 유지 + info 추가 */
  --color-background: var(--background);
  /* … 기존 매핑 전부 … */
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);

  /* 형태 */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 4px);
  --radius-xl: calc(var(--radius) + 8px);
  --radius-2xl: calc(var(--radius) + 16px);

  /* 타이포 */
  --font-sans: var(--font-family-sans);
  --font-serif: var(--font-family-serif);
  --font-mono: var(--font-family-mono);
  --tracking-theme: var(--tracking-normal);

  /* 공간 — Tailwind의 기본 간격 척도를 테마가 정한다 */
  --spacing: var(--space);

  /* 그림자 */
  --shadow-theme-sm: var(--shadow-sm);
  --shadow-theme-md: var(--shadow-md);
  --shadow-theme-lg: var(--shadow-lg);

  /* 모션 — duration은 이름공간이 없어 여기 없다. CVA에서 duration-(--duration-normal)로 쓴다 */
  --ease-theme: var(--ease);
}

/* ─── Base ─── */
*,
*::before,
*::after {
  border-color: var(--border);
  outline-color: var(--ring);
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-family-sans);
  letter-spacing: var(--tracking-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  min-height: 100vh;
}
```

**import 순서가 곧 캐스케이드 순서다.** `[data-theme="default"]`와 `[data-theme="vintage-paper"]`는 명시도가 같으므로 나중에 선언된 쪽이 이긴다. `default.css`를 항상 맨 먼저 import하고 나머지를 뒤에 둔다. `:root`(default light)와 `:root[data-mode="dark"]`(default dark)가 모든 테마의 바닥값 노릇을 하므로, 어떤 테마가 토큰 하나를 빠뜨려도 default 값으로 떨어진다 — 파리티 테스트가 그 누락을 잡는 이유다.

**`--spacing: var(--space)` 주의**: Tailwind v4의 `--spacing`은 `p-4` `h-10` 같은 숫자 유틸리티의 곱셈 단위다. 기본값이 `0.25rem`이므로 `--space: 0.25rem`인 `default`에서는 지금과 완전히 같은 결과가 나온다. 값이 다른 테마에서는 전 간격이 비례해 바뀐다 — 이게 의도한 동작이다.

- [ ] **Step 8: 통과 확인**

```bash
npm test -- tokens
npm test
npm run build
```

Expected: tokens 5/5 PASS, 기존 테스트 전부 PASS, 빌드 성공. 빌드가 `--shadow-*` 조립식에서 실패하면 `rgb(var(--shadow-color) / …)` 문법을 확인한다(`--shadow-color`는 `0 0 0`처럼 공백 구분 숫자 3개여야 한다).

- [ ] **Step 9: default light 회귀 확인**

```bash
npm run build-storybook 2>&1 | tail -3
```

빌드된 CSS에서 `default` light 값이 기존과 같은지 눈으로 확인한다:

```bash
grep -o -- "--primary:[^;]*" storybook-static/assets/*.css | head -3
```

Expected: `--primary: oklch(51% 0.195 256)` (기존 값).

- [ ] **Step 10: 커밋**

```bash
git add src/styles/index.css src/styles/themes scripts/check-token-parity.ts test/tokens.test.ts vitest.config.ts
git commit -m "feat(theme): L1 토큰을 data-theme × data-mode 두 축으로 분리하고 공간·그림자·모션 축 추가"
```

---

### Task 2: L2 컴포넌트 토큰 + CVA 전환 + data-ui [Opus]

**Files:**
- Modify: `src/styles/index.css` (L2 토큰 블록 + `@theme inline` 매핑 추가)
- Modify: `src/components/atoms/Button.tsx`, `Input.tsx`, `Card.tsx`, `Badge.tsx`, `Dialog.tsx`
- Create: `test/component-tokens.test.tsx`

**Interfaces:**
- Consumes: Task 1의 L1 토큰과 `@theme inline` 블록
- Produces:
  - L2 토큰(모두 `:root`에서 L1 파생, 테마 파일이 덮어쓸 수 있음):
    `--button-radius` `--button-h-sm` `--button-h-md` `--button-h-lg` `--button-px-sm` `--button-px-md` `--button-px-lg`
    `--input-h` `--input-radius` `--input-border-w` `--input-px`
    `--card-radius` `--card-padding` `--card-shadow`
    `--badge-radius` `--badge-px` `--badge-py`
    `--dialog-radius` `--dialog-padding`
  - Tailwind 매핑으로 생기는 유틸리티: `rounded-button` `h-button-sm|md|lg` `w-button-sm|md|lg` `px-button-x-sm|md|lg` `h-input` `rounded-input` `px-input-x` `rounded-card` `p-card` `shadow-card` `rounded-badge` `px-badge-x` `py-badge-y` `rounded-dialog` `p-dialog`
  - 가로/세로 패딩 토큰에 `-x` · `-y`를 붙이는 이유: 높이는 `--spacing-button-md`(→ `h-button-md`)를 쓰므로 패딩이 같은 이름을 쓸 수 없다. `--spacing-button-x-md` → `px-button-x-md`로 갈라둔다
  - DOM 계약: Button `data-ui="button" data-variant=<variant> data-size=<size>`, Input `data-ui="input"`, Card 루트 `data-ui="card"`, Badge `data-ui="badge" data-variant=<variant>`, Dialog Popup `data-ui="dialog"`

- [ ] **Step 1: 실패하는 테스트**

`test/component-tokens.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";

describe("data-ui 계약", () => {
  it("Button은 ui · variant · size를 단다", () => {
    render(<Button>x</Button>);
    const el = screen.getByRole("button");
    expect(el.getAttribute("data-ui")).toBe("button");
    expect(el.getAttribute("data-variant")).toBe("default");
    expect(el.getAttribute("data-size")).toBe("md");
  });

  it("명시한 variant · size가 그대로 실린다", () => {
    render(<Button variant="ghost" size="lg">x</Button>);
    const el = screen.getByRole("button");
    expect(el.getAttribute("data-variant")).toBe("ghost");
    expect(el.getAttribute("data-size")).toBe("lg");
  });

  it("호출자가 data-ui를 덮어쓰지 못한다", () => {
    render(<Button {...({ "data-ui": "sneaky" } as Record<string, string>)}>x</Button>);
    expect(screen.getByRole("button").getAttribute("data-ui")).toBe("button");
  });

  it("Input · Card · Badge도 단다", () => {
    const { container } = render(
      <>
        <Input aria-label="i" />
        <Card>c</Card>
        <Badge variant="success">b</Badge>
      </>,
    );
    expect(container.querySelector('[data-ui="input"]')).not.toBeNull();
    expect(container.querySelector('[data-ui="card"]')).not.toBeNull();
    expect(container.querySelector('[data-ui="badge"]')?.getAttribute("data-variant")).toBe("success");
  });
});

describe("L2 유틸리티 전환", () => {
  it("Button은 하드코딩된 크기·모서리 대신 토큰 유틸리티를 쓴다", () => {
    render(<Button>x</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("rounded-button");
    expect(cls).toContain("h-button-md");
    expect(cls).toContain("px-button-x-md");
    expect(cls).not.toMatch(/\brounded-full\b/);
    expect(cls).not.toMatch(/\bh-10\b/);
    expect(cls).not.toMatch(/\bduration-200\b/);
  });

  it("Input은 h-input · rounded-input을 쓴다", () => {
    const { container } = render(<Input aria-label="i" />);
    const cls = (container.querySelector('[data-ui="input"]') as HTMLElement).className;
    expect(cls).toContain("h-input");
    expect(cls).toContain("rounded-input");
    expect(cls).not.toMatch(/\brounded-xl\b/);
  });

  it("Card는 rounded-card · shadow-card를 쓴다", () => {
    const { container } = render(<Card>c</Card>);
    const cls = (container.querySelector('[data-ui="card"]') as HTMLElement).className;
    expect(cls).toContain("rounded-card");
    expect(cls).toContain("shadow-card");
    expect(cls).not.toMatch(/\brounded-2xl\b/);
  });

  it("arbitrary value를 쓰지 않는다 — duration만 예외", () => {
    render(<Button>x</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).not.toMatch(/\[var\(--/);
    expect(cls).toContain("duration-(--duration-normal)");
  });
});
```

- [ ] **Step 2: 실패 확인**

```bash
npm test -- component-tokens
```

Expected: FAIL — `data-ui`가 없어서 첫 테스트부터 깨진다.

- [ ] **Step 3: L2 토큰과 매핑을 index.css에 추가**

Task 1이 만든 `@theme inline` 블록 **앞에** L2 파생 블록을 넣는다(파생은 `:root`, 매핑은 `@theme inline`).

```css
/* ─── L2 컴포넌트 토큰 — 기본값은 L1에서 파생한다. 테마가 덮어쓸 수 있다 ─── */
:root {
  --button-radius: 9999px;
  --button-h-sm: 2rem;
  --button-h-md: 2.5rem;
  --button-h-lg: 3rem;
  --button-px-sm: 1rem;
  --button-px-md: 1.25rem;
  --button-px-lg: 1.75rem;

  --input-h: 2.5rem;
  --input-radius: calc(var(--radius) + 8px);
  --input-border-w: 1px;
  --input-px: 0.75rem;

  --card-radius: calc(var(--radius) + 16px);
  --card-padding: 1.5rem;
  --card-shadow: var(--shadow-sm);

  --badge-radius: 9999px;
  --badge-px: 0.625rem;
  --badge-py: 0.125rem;

  --dialog-radius: calc(var(--radius) + 16px);
  --dialog-padding: 1.5rem;
}
```

**값 근거**: 현재 코드의 하드코딩 값과 1:1로 같다. Button `rounded-full`→`9999px`, `h-8/10/12`→`2/2.5/3rem`, `px-4/5/7`→`1/1.25/1.75rem`. Input `h-10`→`2.5rem`, `rounded-xl`→`--radius + 8px`. Card `rounded-2xl`→`--radius + 16px`, `p-6`→`1.5rem`. Badge `px-2.5 py-0.5`→`0.625rem`/`0.125rem`. Dialog `rounded-2xl` `p-6`. `default`에서 결과가 바뀌지 않는다.

`@theme inline` 블록 안에 매핑을 더한다:

```css
  /* L2 — 컴포넌트 토큰을 유틸리티로 */
  --radius-button: var(--button-radius);
  --spacing-button-sm: var(--button-h-sm);
  --spacing-button-md: var(--button-h-md);
  --spacing-button-lg: var(--button-h-lg);
  --spacing-button-x-sm: var(--button-px-sm);
  --spacing-button-x-md: var(--button-px-md);
  --spacing-button-x-lg: var(--button-px-lg);

  --radius-input: var(--input-radius);
  --spacing-input: var(--input-h);
  --spacing-input-x: var(--input-px);

  --radius-card: var(--card-radius);
  --spacing-card: var(--card-padding);
  --shadow-card: var(--card-shadow);

  --radius-badge: var(--badge-radius);
  --spacing-badge-x: var(--badge-px);
  --spacing-badge-y: var(--badge-py);

  --radius-dialog: var(--dialog-radius);
  --spacing-dialog: var(--dialog-padding);
```

이름이 `-x` · `-y`로 갈라진 이유는 위 Interfaces에 적어뒀다. 높이(`--spacing-button-md` → `h-button-md`)와 가로 패딩(`--spacing-button-x-md` → `px-button-x-md`)이 같은 이름공간을 쓰기 때문이다.

- [ ] **Step 4: Button 전환**

`buttonVariants`의 base와 size를 바꾼다. variant(색)는 건드리지 않는다.

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-(--duration-normal) ease-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: { /* 기존 그대로 */ },
      size: {
        sm: "h-button-sm rounded-button px-button-x-sm text-xs",
        md: "h-button-md rounded-button px-button-x-md text-sm",
        lg: "h-button-lg rounded-button px-button-x-lg text-base",
        icon: "h-button-md w-button-md rounded-button",
        "icon-sm": "h-button-sm w-button-sm rounded-button",
        "icon-lg": "h-button-lg w-button-lg rounded-button",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)
```

컴포넌트 본문에서 data 속성을 단다. **`{...props}` 뒤가 아니라 앞에 두면 호출자가 덮어쓸 수 있으므로 뒤에 둔다.**

```tsx
const Button = React.forwardRef<
  React.ElementRef<typeof ButtonPrimitive>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => (
  <ButtonPrimitive
    ref={ref}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
    data-ui="button"
    data-variant={variant ?? "default"}
    data-size={size ?? "md"}
  />
))
```

- [ ] **Step 5: Input · Card · Badge · Dialog 전환**

`Input.tsx`: 첫 줄의 `"flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 …"` → `"flex h-input w-full rounded-input border-(length:--input-border-w) border-input bg-background px-input-x py-2 …"`. `{...props}` 뒤에 `data-ui="input"`.

`Card.tsx` `CardRoot`: `"rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"` → `"rounded-card border border-border bg-card text-card-foreground shadow-card transition-shadow duration-(--duration-normal) hover:shadow-theme-md"`. `{...props}` 뒤에 `data-ui="card"`. `CardHeader`·`CardContent`·`CardFooter`의 `p-6`/`pt-0`은 `p-card`/`pt-0`으로 바꾼다.

`Badge.tsx`: base `"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors"` → `"inline-flex items-center rounded-badge border px-badge-x py-badge-y text-xs font-medium transition-colors duration-(--duration-normal)"`. 본문에 `{...props}` 뒤로 `data-ui="badge" data-variant={variant ?? "default"}`.

`Dialog.tsx` `DialogContent`의 Popup: `"rounded-2xl border border-border bg-background p-6 shadow-xl"` → `"rounded-dialog border border-border bg-background p-dialog shadow-theme-lg"`, 그리고 같은 줄의 `"duration-200"` → `"duration-(--duration-normal)"`. Popup에 `data-ui="dialog"`를 `{...props}` 뒤에 단다.

- [ ] **Step 6: 통과 확인**

```bash
npm test -- component-tokens
npm test
npm run build
```

Expected: component-tokens 8/8 PASS, 기존 컴포넌트 테스트 전부 PASS, 빌드 성공.

`border-(length:--input-border-w)` 문법이 v4에서 안 먹으면 `border`(1px 기본)로 되돌리고 `--input-border-w`를 L2 토큰 목록에서 뺀 뒤 보고한다. 테두리 두께는 이번 범위의 핵심이 아니다.

- [ ] **Step 7: 렌더 회귀 확인**

```bash
npm run build-storybook >/dev/null 2>&1 && grep -c "rounded-button\|h-button-md" storybook-static/assets/*.css
```

Expected: 1 이상. 0이면 `@theme inline` 매핑 이름과 유틸리티 이름이 어긋난 것이다 — 생성된 CSS에서 `.h-button-md` 셀렉터를 찾아 실제 이름을 확인하고 CVA를 맞춘다.

- [ ] **Step 8: 커밋**

```bash
git add src/styles/index.css src/components/atoms/Button.tsx src/components/atoms/Input.tsx src/components/atoms/Card.tsx src/components/atoms/Badge.tsx src/components/atoms/Dialog.tsx test/component-tokens.test.tsx
git commit -m "feat(theme): L2 컴포넌트 토큰 도입 · CVA를 네이티브 유틸리티로 전환 · data-ui 부착"
```

---

### Task 3: ThemeProvider 2축 + localStorage 마이그레이션 [Opus]

**Files:**
- Modify: `src/context/ThemeContext.tsx` (전면 재작성)
- Create: `test/theme-provider.test.tsx`
- Modify: `src/index.ts` (export 확인 — 이미 내보내고 있으면 타입만 갱신)

**Interfaces:**
- Consumes: Task 1의 `data-theme` / `data-mode` 셀렉터 규약
- Produces:
  ```ts
  export type DesignTheme = "default" | "finance" | "vintage-paper" | "mocha-mousse" | "neo-brutalism" | "claymorphism";
  export type ColorMode = "light" | "dark" | "system";
  export type ResolvedMode = "light" | "dark";
  export type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: DesignTheme;     // 기본 "default"
    defaultMode?: ColorMode;        // 기본 "system"
    themeStorageKey?: string;       // 기본 "ui-design-theme"
    modeStorageKey?: string;        // 기본 "ui-color-mode"
  };
  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
  export function useTheme(): {
    theme: DesignTheme; setTheme: (t: DesignTheme) => void;
    mode: ColorMode; setMode: (m: ColorMode) => void;
    resolvedMode: ResolvedMode;
  };
  export const DESIGN_THEMES: readonly DesignTheme[];
  ```
- 마이그레이션 규약: 옛 키 `ui-theme`가 있으면 첫 실행에 한 번 읽어 옮기고 지운다. `light`/`dark` → mode, `finance` → `{theme: "finance", mode: "dark"}`.

- [ ] **Step 1: 실패하는 테스트**

`test/theme-provider.test.tsx`:

```tsx
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function Probe() {
  const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();
  return (
    <>
      <span data-testid="state">{`${theme}/${mode}/${resolvedMode}`}</span>
      <button onClick={() => setTheme("finance")}>t</button>
      <button onClick={() => setMode("dark")}>m</button>
    </>
  );
}

const root = () => document.documentElement;
const attrs = () => `${root().getAttribute("data-theme")}/${root().getAttribute("data-mode")}`;

function mockMatchMedia(prefersDark: boolean) {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: prefersDark,
    media: q,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.delete(cb),
  }));
  return { fire: (matches: boolean) => listeners.forEach((cb) => cb({ matches } as MediaQueryListEvent)) };
}

beforeEach(() => {
  localStorage.clear();
  root().removeAttribute("data-theme");
  root().removeAttribute("data-mode");
});
afterEach(() => vi.unstubAllGlobals());

describe("ThemeProvider", () => {
  it("두 축을 각각 <html> 속성으로 꽂는다", () => {
    mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/light");
    expect(screen.getByTestId("state").textContent).toBe("default/system/light");
  });

  it("system은 matchMedia로 풀어서 꽂고 system이라는 값은 DOM에 넣지 않는다", () => {
    mockMatchMedia(true);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/dark");
    expect(root().getAttribute("data-mode")).not.toBe("system");
  });

  it("OS 설정이 바뀌면 따라간다", () => {
    const mm = mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/light");
    act(() => mm.fire(true));
    expect(attrs()).toBe("default/dark");
  });

  it("두 축이 서로 독립으로 바뀐다", async () => {
    mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    await userEvent.click(screen.getByText("t"));
    expect(attrs()).toBe("finance/light");
    await userEvent.click(screen.getByText("m"));
    expect(attrs()).toBe("finance/dark");
  });

  it("키 두 개에 따로 저장한다", async () => {
    mockMatchMedia(false);
    render(<ThemeProvider><Probe /></ThemeProvider>);
    await userEvent.click(screen.getByText("t"));
    await userEvent.click(screen.getByText("m"));
    expect(localStorage.getItem("ui-design-theme")).toBe("finance");
    expect(localStorage.getItem("ui-color-mode")).toBe("dark");
  });

  it("옛 ui-theme=dark를 mode로 옮기고 지운다", () => {
    mockMatchMedia(false);
    localStorage.setItem("ui-theme", "dark");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/dark");
    expect(localStorage.getItem("ui-theme")).toBeNull();
    expect(localStorage.getItem("ui-color-mode")).toBe("dark");
  });

  it("옛 ui-theme=finance를 두 축으로 쪼갠다", () => {
    mockMatchMedia(false);
    localStorage.setItem("ui-theme", "finance");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("finance/dark");
    expect(localStorage.getItem("ui-design-theme")).toBe("finance");
    expect(localStorage.getItem("ui-color-mode")).toBe("dark");
  });

  it("저장된 값이 쓰레기면 기본값으로 떨어진다", () => {
    mockMatchMedia(false);
    localStorage.setItem("ui-design-theme", "nope");
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(attrs()).toBe("default/light");
  });

  it("useTheme을 Provider 밖에서 부르면 던진다", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/ThemeProvider/);
    spy.mockRestore();
  });
});
```

- [ ] **Step 2: 실패 확인**

```bash
npm test -- theme-provider
```

Expected: FAIL. 현재 `ThemeContext.tsx`에는 `mode`가 없고, `useTheme`은 기본값 객체를 반환할 뿐 던지지 않는다.

- [ ] **Step 3: 구현**

`src/context/ThemeContext.tsx` 전문:

```tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

export const DESIGN_THEMES = [
  "default",
  "finance",
  "vintage-paper",
  "mocha-mousse",
  "neo-brutalism",
  "claymorphism",
] as const

export type DesignTheme = (typeof DESIGN_THEMES)[number]
export type ColorMode = "light" | "dark" | "system"
export type ResolvedMode = "light" | "dark"

const COLOR_MODES: readonly ColorMode[] = ["light", "dark", "system"]

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: DesignTheme
  defaultMode?: ColorMode
  themeStorageKey?: string
  modeStorageKey?: string
}

type ThemeProviderState = {
  theme: DesignTheme
  setTheme: (theme: DesignTheme) => void
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  resolvedMode: ResolvedMode
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

const canUseDOM = typeof window !== "undefined"

function read(key: string): string | null {
  if (!canUseDOM) return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    // 사파리 프라이빗 모드 등에서 접근이 막힌다. 저장 없이 동작한다.
    return null
  }
}

function write(key: string, value: string): void {
  if (!canUseDOM) return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* 저장 실패는 무시한다 */
  }
}

/** 옛 단일 축 키(ui-theme)를 두 축으로 옮기고 지운다. 첫 실행에 한 번만 일어난다. */
function migrateLegacy(themeKey: string, modeKey: string): void {
  const legacy = read("ui-theme")
  if (legacy === null) return
  if (legacy === "light" || legacy === "dark") write(modeKey, legacy)
  else if (legacy === "finance") {
    write(themeKey, "finance")
    write(modeKey, "dark")
  }
  try {
    window.localStorage.removeItem("ui-theme")
  } catch {
    /* 무시 */
  }
}

function prefersDark(): boolean {
  return canUseDOM && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false
}

export function ThemeProvider({
  children,
  defaultTheme = "default",
  defaultMode = "system",
  themeStorageKey = "ui-design-theme",
  modeStorageKey = "ui-color-mode",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<DesignTheme>(() => {
    migrateLegacy(themeStorageKey, modeStorageKey)
    const stored = read(themeStorageKey)
    return DESIGN_THEMES.includes(stored as DesignTheme) ? (stored as DesignTheme) : defaultTheme
  })

  const [mode, setModeState] = useState<ColorMode>(() => {
    const stored = read(modeStorageKey)
    return COLOR_MODES.includes(stored as ColorMode) ? (stored as ColorMode) : defaultMode
  })

  const [systemDark, setSystemDark] = useState<boolean>(prefersDark)

  useEffect(() => {
    if (!canUseDOM || typeof window.matchMedia !== "function") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const resolvedMode: ResolvedMode = mode === "system" ? (systemDark ? "dark" : "light") : mode

  useEffect(() => {
    if (!canUseDOM) return
    const root = window.document.documentElement
    root.setAttribute("data-theme", theme)
    root.setAttribute("data-mode", resolvedMode)
  }, [theme, resolvedMode])

  const setTheme = useCallback(
    (next: DesignTheme) => {
      write(themeStorageKey, next)
      setThemeState(next)
    },
    [themeStorageKey],
  )

  const setMode = useCallback(
    (next: ColorMode) => {
      write(modeStorageKey, next)
      setModeState(next)
    },
    [modeStorageKey],
  )

  const value = useMemo(
    () => ({ theme, setTheme, mode, setMode, resolvedMode }),
    [theme, setTheme, mode, setMode, resolvedMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

**기존 파일의 버그를 함께 없앤다**: 현재 코드는 파일 끝에 `const props = {}`를 두고 `<ThemeContext.Provider value={value} {...props}>`로 스프레드하는 흔적이 있다. 위 전문에는 없다.

- [ ] **Step 4: export 확인**

`src/index.ts`에 ThemeProvider가 없으면 추가한다:

```ts
export { ThemeProvider, useTheme, DESIGN_THEMES } from './context/ThemeContext';
export type { DesignTheme, ColorMode, ResolvedMode, ThemeProviderProps } from './context/ThemeContext';
```

이미 있으면 타입 export만 위 목록에 맞춘다.

- [ ] **Step 5: 통과 확인**

```bash
npm test -- theme-provider
npm test
npx tsc -b --noEmit 2>&1 | head -5 || npm run build
```

Expected: theme-provider 9/9 PASS, 전체 PASS, 타입 오류 없음.

- [ ] **Step 6: 커밋**

```bash
git add src/context/ThemeContext.tsx src/index.ts test/theme-provider.test.tsx
git commit -m "feat(theme): ThemeProvider를 테마·모드 두 축으로 분리하고 옛 키를 마이그레이션"
```

---

### Task 4: Storybook 2축 툴바 + 렌더 회귀 테스트 [Opus]

**Files:**
- Modify: `.storybook/preview.ts`
- Create: `test/theme-render.test.ts`, `scripts/measure-contrast.ts`
- Modify: `package.json` (`"test:contrast"` 스크립트 추가)

**Interfaces:**
- Consumes: Task 1의 셀렉터 규약, Task 3의 `DESIGN_THEMES`
- Produces: `npm run test:contrast` — 테마 × 모드 전 블록의 foreground/background 대비율을 표로 출력. Task 5가 기록에 쓴다.

- [ ] **Step 1: Storybook 툴바 2축화**

`.storybook/preview.ts`:

```ts
import type { Preview } from "@storybook/react-vite";
import React from "react";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  globalTypes: {
    designTheme: {
      description: "디자인 테마",
      defaultValue: "default",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["default", "finance", "vintage-paper", "mocha-mousse", "neo-brutalism", "claymorphism"],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: "컬러 모드",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { designTheme, colorMode } = context.globals;
      React.useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", designTheme);
        root.setAttribute("data-mode", colorMode);
        // 기존 단일 축 클래스가 남아 있으면 지운다
        root.classList.remove("light", "dark", "finance");
        document.body.className = "";
      }, [designTheme, colorMode]);
      return React.createElement(Story);
    },
  ],
};

export default preview;
```

**기존 데코레이터는 `document.body.className = theme`을 했다.** 두 축은 `<html>` 속성이므로 body 클래스를 비운다.

- [ ] **Step 2: 실패하는 렌더 테스트**

`test/theme-render.test.ts` — jsdom은 `@import`한 CSS를 계산하지 않으므로 Playwright로 진짜 브라우저를 쓴다. vitest가 이 파일을 node 환경에서 돌리도록 파일 상단에 지시한다.

```ts
// @vitest-environment node
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let browser: Browser;
let pageUrl: string;

beforeAll(async () => {
  // Storybook 빌드 산출물의 CSS를 그대로 쓴다. 없으면 이 테스트는 스킵된다.
  const dir = mkdtempSync(join(tmpdir(), "theme-render-"));
  const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="STYLE_HREF">
<body><div id="probe" style="background: var(--background); color: var(--foreground)">x</div>
<button data-ui="button" class="h-button-md rounded-button">b</button></body>`;
  writeFileSync(join(dir, "index.html"), html);
  pageUrl = `file://${join(dir, "index.html")}`;
  browser = await chromium.launch();
}, 60_000);

afterAll(async () => { await browser?.close(); });

describe("테마 적용", () => {
  it("data-theme을 바꾸면 --background가 바뀐다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    const read = () => page.evaluate(() => getComputedStyle(document.getElementById("probe")!).backgroundColor);
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
    const light = await page.evaluate(() => getComputedStyle(document.getElementById("probe")!).backgroundColor);
    await page.evaluate(() => document.documentElement.setAttribute("data-mode", "dark"));
    const dark = await page.evaluate(() => getComputedStyle(document.getElementById("probe")!).backgroundColor);
    expect(light).not.toBe(dark);
    await page.close();
  }, 30_000);

  it("L2 유틸리티가 실제 크기로 해석된다", async () => {
    const page = await browser.newPage();
    await page.goto(pageUrl);
    const h = await page.evaluate(() => getComputedStyle(document.querySelector('[data-ui="button"]')!).height);
    expect(h).toBe("40px"); // --button-h-md 2.5rem
    await page.close();
  }, 30_000);
});
```

**`STYLE_HREF` 자리**: `beforeAll`에서 `storybook-static/assets/` 안의 가장 큰 `.css` 파일 경로를 찾아 넣는다. 파일이 없으면 `npm run build-storybook`을 먼저 돌리라는 메시지와 함께 `it.skip`으로 넘긴다. 구현 시 이 부분을 다음으로 채운다:

```ts
import { existsSync, readdirSync, statSync } from "node:fs";
const SB = new URL("../storybook-static/assets", import.meta.url).pathname;
const cssFile = existsSync(SB)
  ? readdirSync(SB).filter((f) => f.endsWith(".css"))
      .map((f) => ({ f, size: statSync(join(SB, f)).size }))
      .sort((a, b) => b.size - a.size)[0]?.f
  : undefined;
```

`cssFile`이 없으면 `describe.skip`을 쓰고 그 사실을 보고한다.

- [ ] **Step 3: 실패 확인 후 통과시키기**

```bash
npm run build-storybook >/dev/null 2>&1
npm test -- theme-render
```

Expected: 3/3 PASS. 세 번째가 `40px`이 아니면 Task 2의 `@theme inline` 매핑 이름이 유틸리티로 안 바뀐 것이다 — 생성된 CSS에서 `.h-button-md`를 찾아 확인한다.

- [ ] **Step 4: 대비율 측정 스크립트**

`scripts/measure-contrast.ts`:

```ts
// 테마 × 모드 전 블록의 foreground/background 대비율을 잰다. Task 5가 docs/themes.md에 기록한다.
import { existsSync, readdirSync, statSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const THEMES = ["default", "finance", "vintage-paper", "mocha-mousse", "neo-brutalism", "claymorphism"];
const MODES = ["light", "dark"];

function luminance([r, g, b]: number[]): number {
  const lin = (c: number) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fg: number[], bg: number[]): number {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

const SB = new URL("../storybook-static/assets", import.meta.url).pathname;
if (!existsSync(SB)) { console.error("storybook-static이 없다. npm run build-storybook 먼저."); process.exit(1); }
const css = readdirSync(SB).filter((f) => f.endsWith(".css"))
  .map((f) => ({ f, size: statSync(join(SB, f)).size })).sort((a, b) => b.size - a.size)[0].f;

const dir = mkdtempSync(join(tmpdir(), "contrast-"));
writeFileSync(join(dir, "index.html"),
  `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="file://${join(SB, css)}">
   <body><div id="p" style="background: var(--background); color: var(--foreground)">x</div>
   <div id="m" style="background: var(--background); color: var(--muted-foreground)">x</div></body>`);

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
      const rgb = (s: string) => s.match(/\d+/g)!.slice(0, 3).map(Number);
      const p = getComputedStyle(document.getElementById("p")!);
      const mm = getComputedStyle(document.getElementById("m")!);
      return [rgb(p.color), rgb(p.backgroundColor), rgb(mm.color)];
    });
    console.log(`| ${theme} | ${mode} | ${ratio(fg, bg).toFixed(2)} | ${ratio(mfg, bg).toFixed(2)} |`);
  }
}
await browser.close();
```

`package.json` scripts에 추가: `"test:contrast": "tsx scripts/measure-contrast.ts"`. `tsx`가 devDependencies에 없으면 `npm i -D tsx`로 넣는다.

- [ ] **Step 5: 확인 · 커밋**

```bash
npm run test:contrast
```

Expected: 12행 표. 이 시점엔 테마가 2종뿐이므로 나머지 4종은 `default` 값이 그대로 나온다(블록이 없으니 상속된다) — 정상이다. Task 5 후에 다시 돌린다.

```bash
npm test
git add .storybook/preview.ts test/theme-render.test.ts scripts/measure-contrast.ts package.json package-lock.json
git commit -m "feat(theme): Storybook 툴바 2축화 · 렌더 회귀 테스트 · 대비율 측정 스크립트"
```

---

### Task 5: 레퍼런스 테마 4종 이식 [Sonnet]

**Files:**
- Create: `src/styles/themes/vintage-paper.css`, `mocha-mousse.css`, `neo-brutalism.css`, `claymorphism.css`
- Modify: `src/styles/index.css` (`@import` 4줄 추가)
- Modify: `.storybook/preview-head.html` (웹폰트)
- Modify: `test/tokens.test.ts` (파일 목록 기대값)
- Create: `docs/themes.md`

**Interfaces:**
- Consumes: Task 1의 L1 토큰 이름 40개와 셀렉터 규약, Task 4의 `npm run test:contrast`
- Produces: 디자인 테마 6종이 모두 실재하는 상태. `docs/themes.md`에 출처·라이선스·대비율 기록.

- [ ] **Step 1: 프리셋 받기**

tweakcn은 shadcn 레지스트리 JSON을 준다. 네 개를 받아 `.tmp/`(gitignore 대상)에 둔다.

```bash
mkdir -p .tmp
for t in vintage-paper mocha-mousse neo-brutalism claymorphism; do
  curl -sS "https://tweakcn.com/r/themes/$t.json" -o ".tmp/$t.json"
  echo "$t: $(node -e "const j=require('./.tmp/$t.json');console.log(Object.keys(j.cssVars.light).length,'light keys')")"
done
```

각 JSON은 `cssVars.light` / `cssVars.dark`를 갖고, 값은 `oklch(...)` 형식이다. 키 이름은 shadcn 규약(`background` `foreground` `primary` … `radius` `font-sans` `font-serif` `font-mono` `letter-spacing` `spacing` `shadow-color` `shadow-opacity` `shadow-blur` `shadow-spread` `shadow-offset-x` `shadow-offset-y`)이다.

`curl`이 막히면 GitHub raw(`https://raw.githubusercontent.com/jnsahaj/tweakcn/main/utils/theme-presets.ts`)에서 해당 프리셋 객체를 찾아 옮긴다.

- [ ] **Step 2: 이름 매핑표대로 옮긴다**

| tweakcn 키 | 우리 L1 토큰 |
|---|---|
| `background` `foreground` `card` `card-foreground` `popover` `popover-foreground` `primary` `primary-foreground` `secondary` `secondary-foreground` `muted` `muted-foreground` `accent` `accent-foreground` `destructive` `destructive-foreground` `border` `input` `ring` | 같은 이름에 `--` 붙임 |
| `radius` | `--radius` |
| `font-sans` `font-serif` `font-mono` | `--font-family-sans` `--font-family-serif` `--font-family-mono` |
| `letter-spacing` | `--tracking-normal` |
| `spacing` | `--space` |
| `shadow-color` | `--shadow-color` — **단, 우리 조립식은 `rgb(<r g b> / <alpha>)`를 기대하므로 `oklch`/`hsl` 문자열이 오면 `0 0 0`으로 두고 `--shadow-opacity`만 프리셋 값을 쓴다.** 색이 있는 그림자는 이번 범위 밖이다 |
| `shadow-opacity` `shadow-blur` `shadow-spread` `shadow-offset-x` `shadow-offset-y` | 같은 이름 |

tweakcn에 **없는** 토큰은 우리가 채운다:
- `--success` `--success-foreground` `--warning` `--warning-foreground` `--info` `--info-foreground`: `default`의 값을 그대로 쓴다(테마별로 손대지 않는다).
- `--duration-fast` `--duration-normal` `--ease`: 테마의 결에 맞춰 정한다 — `neo-brutalism`은 `80ms`/`120ms`/`cubic-bezier(0.2, 0, 0, 1)`(딱딱하게), `claymorphism`은 `160ms`/`280ms`/`cubic-bezier(0.34, 1.56, 0.64, 1)`(말랑하게), `vintage-paper`·`mocha-mousse`는 `default`와 같은 값.
- `color-scheme`: light 블록 `light`, dark 블록 `dark`.

파일 형식(예 `vintage-paper.css`):

```css
/* vintage-paper — 잉크·종이. 출처: tweakcn (Apache-2.0), https://tweakcn.com/r/themes/vintage-paper.json */
[data-theme="vintage-paper"] {
  --background: oklch(0.9582 0.0152 90.2357);
  /* … 40개 토큰 전부 … */
  color-scheme: light;
}

[data-theme="vintage-paper"][data-mode="dark"] {
  /* … 40개 토큰 전부 … */
  color-scheme: dark;
}
```

- [ ] **Step 3: index.css에 import 추가**

`@import "./themes/finance.css";` 아래에 네 줄을 더한다.

```css
@import "./themes/vintage-paper.css";
@import "./themes/mocha-mousse.css";
@import "./themes/neo-brutalism.css";
@import "./themes/claymorphism.css";
```

- [ ] **Step 4: 테스트 기대값 갱신**

`test/tokens.test.ts`의 파일 목록 기대값을 고친다:

```ts
    expect(files).toEqual([
      "claymorphism.css", "default.css", "finance.css",
      "mocha-mousse.css", "neo-brutalism.css", "vintage-paper.css",
    ]);
```

- [ ] **Step 5: 웹폰트**

레퍼런스 테마는 Google Fonts(Libre Baskerville, Lora, IBM Plex Mono 등)를 지정한다. **라이브러리가 폰트를 자동으로 불러오지는 않는다** — 소비자 결정이다. Storybook 미리보기에서만 불러온다.

`.storybook/preview-head.html`에 각 테마가 실제로 쓰는 폰트 패밀리를 확인해 링크를 추가한다(프리셋 JSON의 `font-sans`/`font-serif`/`font-mono` 값에서 패밀리 이름을 뽑는다):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=<패밀리들>&display=swap" rel="stylesheet">
```

기존 `preview-head.html` 내용은 지우지 말고 덧붙인다.

- [ ] **Step 6: 확인**

```bash
npm test
npm run build
npm run build-storybook >/dev/null 2>&1 && npm run test:contrast
```

Expected: 파리티 테스트가 12블록 전부 통과(토큰 40개 일치), 대비율 표 12행. 파리티가 깨지면 빠진 토큰 이름을 표로 알려주므로 그대로 채운다.

- [ ] **Step 7: docs/themes.md**

```markdown
# 디자인 테마

my-ui-lib은 컬러 모드(`data-mode`)와 디자인 테마(`data-theme`)를 따로 둔다. 테마 하나가 light/dark 한 쌍을 가진다.

## 목록

| 이름 | 결 | 출처 |
|---|---|---|
| `default` | Apple 계열. 라이브러리 기본값 | 자체 |
| `finance` | 어두운 금융 대시보드 | 자체 (v1의 finance 테마) |
| `vintage-paper` | 잉크·종이 | tweakcn |
| `mocha-mousse` | 따뜻한 | tweakcn |
| `neo-brutalism` | 각지고 강한 | tweakcn |
| `claymorphism` | 둥글고 부드러운 | tweakcn |

## 출처와 라이선스

레퍼런스 4종의 색·반경·그림자·타이포 값은 [tweakcn](https://github.com/jnsahaj/tweakcn)(Apache-2.0)의 동명 프리셋에서 가져왔다. 이름을 그대로 둔 것은 출처를 밝히기 위해서다. 모션 값(`--duration-*` `--ease`)과 상태색(`--success` `--warning` `--info`)은 tweakcn에 없어 우리가 정했다.

## 폰트

레퍼런스 테마는 Google Fonts 패밀리를 지정하지만 **라이브러리가 폰트를 불러오지 않는다.** 소비자가 직접 로드해야 한다. Storybook 미리보기에는 `.storybook/preview-head.html`에서 불러온다.

## 대비율

`npm run test:contrast` 결과. 본문(`--foreground`)과 보조 텍스트(`--muted-foreground`)를 배경 대비로 잰 값이다. WCAG 1.4.3의 본문 기준은 4.5:1이다.

<여기에 npm run test:contrast 출력 표를 그대로 붙인다>

4.5:1을 못 넘는 조합은 그대로 기록한다. 레퍼런스 테마의 값을 고치지 않는 것이 원칙이고, 이 표는 6단계 판정에서 기준선으로 쓴다.
```

`<여기에 …>` 자리를 실제 출력으로 채운다.

- [ ] **Step 8: 커밋**

```bash
echo ".tmp/" >> .gitignore
git add src/styles/themes src/styles/index.css .storybook/preview-head.html test/tokens.test.ts docs/themes.md .gitignore
git commit -m "feat(theme): 레퍼런스 테마 4종 이식 (tweakcn, Apache-2.0)"
```

---

### Task 6: 문서 · 버전 · PR [Sonnet]

**Files:**
- Modify: `README.md`, `package.json`
- Create: `CHANGELOG.md` (없으면)

**Interfaces:**
- Consumes: Task 1~5 전부

- [ ] **Step 1: README 테마 절**

`README.md`에 다음 절을 추가한다(기존 내용은 건드리지 않는다).

````markdown
## 테마

컬러 모드와 디자인 테마는 별개의 축이다.

```tsx
import { ThemeProvider, useTheme, DESIGN_THEMES } from "@junseop-shin/my-ui-lib";

<ThemeProvider defaultTheme="default" defaultMode="system">
  <App />
</ThemeProvider>
```

```tsx
const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();
// theme: default | finance | vintage-paper | mocha-mousse | neo-brutalism | claymorphism
// mode: light | dark | system   resolvedMode: light | dark
```

Provider는 `<html>`에 `data-theme`과 `data-mode`를 꽂는다. `system`은 `matchMedia`로 풀어서 꽂으므로 DOM에는 `light`/`dark`만 들어간다.

테마 목록과 출처는 [docs/themes.md](docs/themes.md), 토큰 구조는 [docs/theme-axis-plan.md](docs/theme-axis-plan.md)를 본다.

### v1에서 올라올 때

`ThemeProvider`의 `theme` prop이 두 축으로 갈라졌다. `theme="dark"`는 `defaultMode="dark"`로, `theme="finance"`는 `defaultTheme="finance" defaultMode="dark"`로 바꾼다. `localStorage`의 옛 `ui-theme` 키는 첫 실행에 자동으로 옮겨진다.
````

- [ ] **Step 2: 버전과 CHANGELOG**

`package.json`의 `"version"`을 `"2.0.0"`으로 바꾼다.

`CHANGELOG.md`:

```markdown
# Changelog

## 2.0.0

### Breaking

- `ThemeProvider`의 단일 `theme` 축이 `theme`(디자인 테마) · `mode`(컬러 모드) 두 축으로 갈라졌다. `useTheme()`은 `{ theme, setTheme, mode, setMode, resolvedMode }`를 반환한다.
- 테마 적용 방식이 `<html>`의 클래스에서 `data-theme` · `data-mode` 속성으로 바뀌었다. 클래스(`.dark` `.finance`)를 직접 셀렉터로 쓰던 코드는 속성 셀렉터로 고쳐야 한다.
- `useTheme()`을 Provider 밖에서 부르면 던진다(전에는 기본값 객체를 돌려줬다).
- `localStorage` 키가 `ui-theme` 하나에서 `ui-design-theme` · `ui-color-mode` 둘로 나뉘었다. 옛 키는 첫 실행에 자동 이전된다.

### Added

- 디자인 테마 6종: `default` `finance` `vintage-paper` `mocha-mousse` `neo-brutalism` `claymorphism`
- L1 토큰에 공간(`--space`) · 그림자 6값 · 모션(`--duration-fast` `--duration-normal` `--ease`) · 타이포(`--font-family-serif` `--font-family-mono` `--tracking-normal`) 축 추가
- L2 컴포넌트 토큰(Button · Input · Card · Badge · Dialog)과 그에 대응하는 Tailwind 유틸리티
- Button · Input · Card · Badge · Dialog에 `data-ui` · `data-variant` · `data-size` 속성
- `npm run test:contrast` — 테마 12블록의 대비율 측정
```

- [ ] **Step 3: 최종 확인**

```bash
npm test
npm run typecheck 2>/dev/null || npx tsc -b --noEmit
npm run build
npm run build-storybook >/dev/null 2>&1 && echo "storybook ok"
```

Expected: 전부 통과.

- [ ] **Step 4: 커밋 · 푸시 · PR**

```bash
git add README.md CHANGELOG.md package.json
git commit -m "docs(theme): 테마 사용법 · 마이그레이션 안내 추가, v2.0.0"
git push -u origin feat/theme-axis
gh pr create --title "feat(theme): 컬러 모드 × 디자인 테마 두 축 분리 및 레퍼런스 테마 6종" --body "<아래 본문>"
```

PR 본문:

```markdown
## 요약

컬러 모드(`data-mode`)와 디자인 테마(`data-theme`)를 두 축으로 나누고, 토큰을 L1(전역)·L2(컴포넌트) 두 층으로 세워 테마를 갈아끼울 수 있게 했다. design-kg 스펙 1~2단계.

- 디자인 테마 6종: `default` `finance` + tweakcn 4종(`vintage-paper` `mocha-mousse` `neo-brutalism` `claymorphism`)
- L1에 공간·그림자·모션·타이포 축 추가, L2 컴포넌트 토큰(Button·Input·Card·Badge·Dialog)
- CVA가 하드코딩 대신 네이티브 유틸리티(`rounded-button` `h-button-md`)를 쓴다
- 5개 컴포넌트에 `data-ui`·`data-variant`·`data-size` — design-kg의 `design_check`가 스냅샷에서 요소를 찾는 데 쓴다
- `ThemeProvider` 2축 + 옛 `ui-theme` 키 자동 마이그레이션

## Breaking

`ThemeProvider` API와 테마 적용 방식(클래스 → 속성)이 바뀌어 v2.0.0으로 올린다. 자세한 건 CHANGELOG.md.

## 검증

- `npm test` 전부 통과 (토큰 파리티 12블록 · ThemeProvider 9건 · 컴포넌트 계약 8건 · 렌더 회귀 3건 포함)
- `default` × light가 v1과 같은 값인지 확인
- `npm run test:contrast` 결과는 docs/themes.md에 기록

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## 완료 기준

- `npm test` 전부 통과, 타입 오류 없음, `npm run build`와 `npm run build-storybook` 성공
- 토큰 파리티 테스트가 테마 6종 × 모드 2 = 12블록 전부에서 토큰 40개 일치를 확인
- Storybook 툴바에서 Theme과 Mode를 각각 바꿀 수 있고, `default` × light가 v1과 같은 화면
- `Button`·`Input`·`Card`·`Badge`·`Dialog`가 `data-ui`를 달고 있고 CVA에 `rounded-full`·`h-10` 같은 하드코딩이 남아 있지 않음
- `docs/themes.md`에 출처·라이선스·대비율 표가 있음
- PR이 올라가 있음 (머지는 수동)
