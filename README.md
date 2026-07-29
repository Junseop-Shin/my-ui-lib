# My UI Library (Finance Design System)

**React 19+, TypeScript, Tailwind CSS v4, Base UI** 기반의 디자인 시스템 라이브러리입니다.
금융권(Fintech) 서비스에 최적화된 테마 시스템과 데이터 시각화 컴포넌트를 제공합니다.

> **v1.0.0** — Headless 기반을 Radix UI에서 [Base UI](https://base-ui.com)로 전환했습니다.
> 자세한 배경은 [Headless 라이브러리 선택](#headless-라이브러리-선택) 참조.

## 🚀 시작하기 (Getting Started)

### 설치 (Installation)

```bash
npm install my-ui-lib
# 또는
yarn add my-ui-lib
```

### 필수 의존성 (Peer Dependencies)

이 라이브러리는 다음 패키지들을 필요로 합니다:
- `react`, `react-dom` (v18 이상)
- `tailwindcss` (v4 권장)
- `lucide-react` (아이콘)

## 🎨 테마 시스템 (Theme System)

3가지 테마를 기본 지원하며, CSS 변수를 통해 커스터마이징 가능합니다.

1. **Light**: 깔끔한 화이트/슬레이트 그레이 조합
2. **Dark**: 눈이 편안한 다크 그레이 조합
3. **Finance**: 신뢰감을 주는 네이비/블루 조합 (블룸버그 스타일)

### 설정 방법 (Setup)

앱 최상단에 `ThemeProvider`를 감싸주세요.

```tsx
import { ThemeProvider } from 'my-ui-lib/context';

function App() {
  return (
    <ThemeProvider defaultTheme="finance" storageKey="my-app-theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

## 🧩 주요 컴포넌트 (Components)

### 폼 · 입력
`Button` · `Input` · `Textarea` · `Label` · `Checkbox` · `CheckboxGroup` · `RadioGroup` · `Switch` ·
`Select` · `Combobox` · `Autocomplete` · `NumberField` · `OtpField` · `Slider` · `Toggle` ·
`ToggleGroup` · `Fieldset` · `Form`

- **Combobox / Autocomplete**: 항목이 많을 때 입력으로 걸러 고릅니다. Combobox는 값을 확정하고, Autocomplete는 자유 입력을 유지합니다.
- **NumberField**: 증감 버튼·통화 포맷·드래그 조절을 지원해 금액·수량 입력에 적합합니다.
- **OtpField**: 2FA 인증코드. 자리별 칸 분리와 붙여넣기 자동 분배.

### 표시 · 피드백
`Badge` · `Tag` · `Avatar` · `Card` · `Icon` · `Separator` · `Progress` · `Meter` · `Toaster` ·
`Tooltip` · `ScrollArea` · `CodeBlock` · `StatCard`

- **Progress / Meter**: 진행률과 범위 내 현재값. 시맨틱이 다릅니다.
- **Toaster**: `toast()` · `toast.success()` 형태로 호출합니다.

### 오버레이 · 메뉴
`Dialog` · `AlertDialog` · `Drawer` · `Popover` · `PreviewCard` · `DropdownMenu` · `ContextMenu` ·
`Menubar` · `NavigationMenu` · `Toolbar` · `Tabs` · `Accordion` · `Collapsible`

- **AlertDialog**: 바깥 클릭·Esc로 닫히지 않습니다. 되돌릴 수 없는 동작 확인용.
- **Drawer**: `side`에 따라 붙는 위치가 바뀌고 스와이프로 닫힙니다.

### 데이터
`Table` · `DataTable` · `StockChart` · `PieChart` · `Sidebar` · `Header` · `PropertyPanel` ·
`NodePalette` · `StrategyNode` · `ActiveStrategyCard`

### Complex Components & Hooks

#### 1. DataTable & useDataTable
TanStack Table 기반의 강력한 데이터 테이블입니다.

```tsx
import { DataTable, useDataTable } from 'my-ui-lib';

const { table, globalFilter, setGlobalFilter } = useDataTable({ data, columns });

return <DataTable table={table} filter={globalFilter} onFilterChange={setGlobalFilter} />;
```

#### 2. StockChart & useChartData
Recharts 기반의 반응형 주식 차트입니다. 상승(Success)/하락(Danger)에 따라 색상이 자동 변경됩니다.

```tsx
import { StockChart } from 'my-ui-lib';

// 데이터만 넣으면 로직이 알아서 처리합니다.
<StockChart data={stockData} height={400} />
```

#### 3. PieChart
심플하고 직관적인 파이 차트입니다. 범례와 툴팁이 기본 포함되어 있습니다.

```tsx
import { PieChart } from 'my-ui-lib';

<PieChart 
  data={[{ name: 'A', value: 100 }, { name: 'B', value: 200 }]} 
  height={300} 
/>
```

#### 4. useResponsive (Hook)
현재 뷰포트 상태를 손쉽게 파악하세요.

```tsx
import { useResponsive } from 'my-ui-lib/hooks';

const { isMobile, isDesktop } = useResponsive();
```

## Headless 라이브러리 선택

v1.0.0에서 Radix UI에서 **Base UI**로 전환했습니다.

둘 다 "기능 뼈대만 제공하고 스타일은 주지 않는다"는 개념은 같습니다. 갈리는 지점은 셋입니다.

| | Radix UI | Base UI |
|---|---|---|
| 배포 단위 | 컴포넌트마다 독립 패키지·독립 버전 (이 레포는 12개를 물고 있었음) | 한 패키지에 subpath export |
| 컴포넌트 수 | — | 40여 개. Combobox·NumberField·OTPField 등 Radix에 없는 것 포함 |
| 상태 표현 | `data-state="checked"` (값) | `data-checked` (속성 존재) |

전환 계기는 [shadcn/ui가 기본값을 Base UI로 바꾼 것](https://ui.shadcn.com)이지만, 실질적 이득은 **컴포넌트 커버리지**였습니다. 전환하면서 21종을 새로 추가할 수 있었습니다.

주의할 점은 상태 표현 방식의 차이입니다. Base UI는 `<button disabled>` 대신 `<span aria-disabled data-disabled>`를 렌더하는 경우가 있어, Tailwind의 `disabled:` 변형이 조용히 매치되지 않습니다. 이 라이브러리는 `data-[disabled]:`를 함께 걸어 해결했습니다.

## 🛠 개발 및 기여 (Development)

```bash
# 의존성 설치
npm install

# 스토리북 실행 (문서 및 테스트)
npm run storybook

# 유닛 테스트 (Vitest)
npm run test:unit

# Storybook 테스트 (빌드 후 실행)
npm run build-storybook && npm run test:storybook:ci

# 빌드
npm run build
```

### 툴체인

TypeScript 6 · Vite 8 · Vitest 4 · Storybook 10 · ESLint 10 · Tailwind CSS 4

## 📄 라이선스 (License)
MIT
