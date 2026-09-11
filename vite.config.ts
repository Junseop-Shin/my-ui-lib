import { readFileSync } from "node:fs"
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

const pkg = JSON.parse(
  readFileSync(path.resolve(__dirname, 'package.json'), 'utf8')
) as { dependencies?: Record<string, string>; peerDependencies?: Record<string, string> }

// dependencies·peerDependencies는 소비자가 제공한다. 하위 경로(react/jsx-runtime 등)까지
// 걸러야 한다 — 정확히 일치하는 목록으로는 잡히지 않아 번들에 들어가고, 그것들이 CJS 파일을
// 끌고 오면 rolldown이 require 심을 심어 소비자 앱 하이드레이션에서 터진다.
const externalNames = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  'tailwindcss',
]
const isExternal = (id: string) =>
  externalNames.some((n) => id === n || id.startsWith(n + '/'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      // 루트 tsconfig.json은 files: []에 references만 있어 대상 파일이 0개다.
      // vite-plugin-dts 5는 이를 그대로 따라 빈 선언만 내보내므로 앱 설정을 직접 지정한다.
      tsconfigPath: './tsconfig.app.json',
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx']
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyUiLib',
      formats: ['es', 'umd'],
      fileName: (format) => `my-ui-lib.${format}.js`
    },
    rollupOptions: {
      external: isExternal,
      // UMD의 globals는 script 태그로 직접 불러올 때만 쓰이는데 이 라이브러리는 그 경로로
      // 쓰이지 않는다. external이 늘면서 이름을 못 찾는다는 경고만 수십 줄 나와 이것만 끈다.
      onwarn(warning, warn) {
        if (warning.code === 'MISSING_GLOBAL_NAME') return
        warn(warning)
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          // 지정하지 않으면 Rollup이 이름을 추측하며, 버전에 따라 결과가 달라진다
          'lucide-react': 'lucideReact',
          '@xyflow/react': 'ReactFlow',
          tailwindcss: 'tailwindcss'
        }
      }
    }
  },
})
