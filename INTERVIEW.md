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

### Q. Radix UI (Headless UI)를 왜 썼나요?
- **핵심**: **"스타일링의 자유도"**와 **"웹 접근성(Accessibility)"** 모두 잡기 위함입니다.
- **설명**:
    - MUI 같은 라이브러리는 이미 스타일이 있어 커스터마이징이 힘듭니다.
    - **Radix UI**는 스타일 없이 **기능(키보드 이동, 스크린 리더, 포커스 제어)**만 제공하는 Headless 라이브러리입니다.
    - 로직은 Radix에게, 디자인은 우리가 원하는 대로 **Tailwind CSS**로 구현하는 최적의 조합입니다.

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
