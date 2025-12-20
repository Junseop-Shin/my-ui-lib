# My UI Library (Finance Design System)

**React 19+, TypeScript, Tailwind CSS, Radix UI** 기반의 강력한 디자인 시스템 라이브러리입니다.
금융권(Fintech) 서비스에 최적화된 테마 시스템과 데이터 시각화 컴포넌트를 제공합니다.

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

### Atomic Components
- **Button**: `intent`와 `size` props로 다양한 스타일 지원 (Primary, Secondary, Danger, Ghost).
- **Input**: Label, HelperText, Error 상태가 통합된 Accessible Input.
- **DropdownMenu**: Radix UI 기반의 강력한 드롭다운 (Submenu 지원).
- **Label**: 접근성을 고려한 라벨 컴포넌트.
- **Icon**: Lucide 아이콘을 래핑하여 일관된 스타일링 제공.

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

#### 3. useResponsive (Hook)
현재 뷰포트 상태를 손쉽게 파악하세요.

```tsx
import { useResponsive } from 'my-ui-lib/hooks';

const { isMobile, isDesktop } = useResponsive();
```

## 🛠 개발 및 기여 (Development)

```bash
# 의존성 설치
npm install

# 스토리북 실행 (문서 및 테스트)
npm run storybook

# 빌드
npm run build
```

## 📄 라이선스 (License)
MIT
