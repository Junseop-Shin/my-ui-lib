## 1. ⚡ 핵심 개발 환경 (Core & Build)

### Q. Vite (비트)를 왜 사용했나요?
- **역할**: 차세대 프론트엔드 빌드 툴이자 개발 서버입니다.
- **선정 이유**:
    1.  **압도적인 개발 속도 (HMR)**: 기존 Webpack은 수정 시 전체를 재빌드해야 했지만, Vite는 **Native ES Modules**를 사용하여 변경된 모듈만 즉시 브라우저에 반영합니다. 프로젝트가 커져도 느려지지 않습니다.
    2.  **최적화된 빌드**: 프로덕션 빌드 시 내부적으로 **Rollup**을 사용하여 트리 쉐이킹(Tree-shaking)과 코드 분할이 매우 효율적입니다.
    3.  **설정의 간편함**: 복잡한 설정 없이 React, TypeScript 등을 플러그인으로 쉽게 적용할 수 있습니다.

### Q. Vitest vs Jest
- **선정 이유**: **"Vite를 쓴다면 Vitest가 정답"**입니다.
- **차이점**:
    - **Jest**: 독자적인 실행 환경을 가져서 Webpack/Vite 설정을 공유하기 어렵고(별도 Babel 설정 필요), 상대적으로 무겁습니다.
    - **Vitest**: **Vite와 설정(Plugins, Resolve, Alias)을 완벽하게 공유**합니다. 별도 설정 없이 Vite 파이프라인을 그대로 타며, HMR 기반이라 실행 속도가 훨씬 빠릅니다.

---

## 2. 📚 컴포넌트 개발 및 문서화 (Component Driven Development)

### Q. Storybook에 대해 설명해주세요.
- **역할**: UI 컴포넌트를 메인 앱 비즈니스 로직과 **격리(Isolation)**시켜 독자적으로 개발하고 문서화하는 도구입니다.
- **장점**:
    1.  **격리된 개발**: API 데이터 없이도 가짜 데이터(Mock)로 모든 상태(Loading, Error, Empty)를 시뮬레이션하며 개발할 수 있습니다.
    2.  **인터랙티브 문서**: 기획자나 디자이너가 직접 `args`(props)를 조작하며 "Theme 변경", "텍스트 변경" 등을 실험해볼 수 있습니다.
    3.  **테스트 기준점**: 시각적 회귀 테스트의 기준이 됩니다.

### Q. Chromatic은 무엇인가요?
- **역할**: Storybook 메인테이너들이 만든 **시각적 회귀 테스트(Visual Regression Testing)** 및 배포 도구입니다.
- **왜 썼나요?**:
    - 코드 리뷰만으로는 CSS가 1px 깨진 것을 찾을 수 없습니다.
    - Chromatic은 이전 배포 버전과 현재 버전의 스크린샷을 **픽셀 단위로 비교**하여 변경점을 자동으로 감지합니다. UI 버그를 원천 차단합니다.

### Q. Playwright (vs Cypress)
- **역할**: 실제 브라우저(Chromium 등)를 띄워 테스트하는 **E2E(End-to-End)** 도구입니다.
- **선정 이유**:
    - Vitest가 "함수가 잘 도는지"(Unit Test) 본다면, Playwright는 "로그인 버튼 클릭 시 페이지가 넘어가는지"(Integration/E2E)를 봅니다.
    - Storybook의 Interaction Test가 Playwright 기반이라 호환성이 좋습니다.

---

## 3. 🏗️ 아키텍처 및 라이브러리 (Architecture)

### Q. Headless UI 라이브러리를 왜 썼나요?
- **핵심**: **"스타일링의 자유도"**와 **"웹 접근성(Accessibility)"**을 모두 잡기 위함입니다.
- **설명**:
    - MUI 같은 라이브러리는 이미 스타일이 있어 커스터마이징이 힘듭니다.
    - Headless 라이브러리는 스타일 없이 **기능(키보드 이동, 스크린 리더, 포커스 제어)**만 제공합니다.
    - 로직은 라이브러리에게, 디자인은 **Tailwind CSS**로 구현하는 조합입니다.

### Q. Radix UI에서 Base UI로 전환했다던데, 왜죠?
- **계기**는 shadcn/ui가 기본값을 Base UI로 바꾼 것이지만, **실질적 이유는 컴포넌트 커버리지**였습니다.
    - Radix에는 Combobox, NumberField, OTPField, Slider 같은 게 없어 필요할 때마다 직접 만들거나 포기해야 했습니다. Base UI는 40여 개를 제공해서, 전환하면서 **21종을 새로 추가**할 수 있었습니다.
- **부수적으로** 배포 단위가 정리됐습니다. Radix는 컴포넌트마다 독립 패키지라 12개 버전을 따로 관리해야 했고, 내부 공통 의존성 버전이 갈리면 번들에 중복 적재됩니다. Base UI는 한 패키지·한 버전입니다.
- **다만 "Radix를 그대로 옮긴 것"은 아닙니다.** Select 구조만 봐도 `Portal > Content > Viewport > Item`이 `Portal > Positioner > Popup > List > Item`으로 한 겹 깊어지고, 합성 방식도 `asChild`에서 `render` prop으로 바뀝니다.

### Q. 전환하면서 가장 위험했던 지점은?
- **스타일 계약이 조용히 깨지는 것**이었습니다. 타입체크로 하나도 안 잡히고, 에러도 안 나고, 색과 위치만 틀어집니다.

| Radix | Base UI | 결과 |
|---|---|---|
| `data-state="checked"` (값) | `data-checked` (속성 존재) | `data-[state=checked]:` 셀렉터 전멸 |
| `<button disabled>` | `<span aria-disabled data-disabled>` | **`disabled:opacity-50`이 영원히 매치 안 됨** |

- `disabled:`가 죽는 게 특히 위험합니다. `:disabled` 의사클래스는 폼 요소에만 걸리는데 Base UI는 `<span>`을 렌더하는 경우가 있어서요. 컴포넌트마다 `data-[disabled]:`로 바꾸고, Label에는 네이티브 폼 요소용 `peer-disabled:`와 Base UI용 `peer-data-[disabled]:`를 **둘 다** 걸었습니다.
- 이걸 잡아준 건 기존 유닛 테스트였습니다. Switch·Checkbox 테스트가 `data-state`를 직접 검증하고 있어서 걸렸고, 테스트가 없던 Separator는 마이그레이션하며 테스트를 추가하다 발견했습니다.

### Q. 시각 회귀는 어떻게 검증했나요?
- 원래 Chromatic이 붙어 있었지만 컴포넌트 7개만 등록된 상태라 베이스라인으로 쓸 수 없었습니다. 그래서 **자동 시각 회귀 검증 없이** 진행했고, 이 점은 한계로 남습니다.
- 대신 **실제로 동작하던 검증 수단을 먼저 CI에 연결**했습니다. 착수 시점에 통과하는 테스트 150개(vitest 74 + Storybook 76)가 아무 데서도 실행되지 않고 있었습니다. `npm run test`는 Storybook 서버가 필요한 명령이었고 CI는 타입체크와 빌드만 돌리고 있었습니다.
- 구조 변경이 큰 컴포넌트는 Storybook을 직접 띄워 눈으로 비교했습니다.

### Q. Tailwind CSS가 있는데 PostCSS는 왜 썼나요?
- **관계**: Tailwind는 PostCSS의 **플러그인**입니다.
- **PostCSS의 역할**:
    - JavaScript로 CSS를 변환하는 '컴파일러'입니다.
    - 브라우저는 `@tailwind` 문법을 모릅니다. PostCSS가 이를 해석해서 표준 CSS로 변환해줍니다.
    - 또한 `autoprefixer`를 통해 브라우저별 호환성 접두사(-webkit-)를 자동으로 붙여주는 역할도 합니다.

### Q. TanStack Table & Recharts
- **TanStack Table**: `<table>` 태그를 강제하지 않는 Headless 데이터 테이블 라이브러리입니다. 복잡한 정렬, 필터링, 페이지네이션 로직만 제공하고 UI는 우리가 자유롭게 그립니다.
- **Recharts**: React 컴포넌트 방식의 차트 라이브러리입니다. D3.js 기반이지만 진입 장벽이 낮고, React 생태계와 가장 잘 맞습니다.

---

## 4. 📦 배포 전략 (Distribution)

### Q. `dist` 폴더와 배포 파일 구성
- **dist (Distribution)**: 소스 코드를 빌드하여 실제 사용자가 쓸 수 있게 만든 결과물 폴더입니다.
- **구성**:
    1.  **ESM (`.es.js`)**: `import` 구문을 사용하는 최신 번들 (Tree-shaking 지원).
    2.  **UMD/CJS**: `require` 구문을 사용하는 구형 환경 지원.
    3.  **d.ts**: TypeScript 타입 정의 파일.
- **패키징**: `package.json`의 `files` 필드를 통해 소스 코드는 제외하고 `dist`만 npm에 올라가도록 하여 용량을 최적화했습니다.
