import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

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
      external: [
        'react',
        'react-dom',
        'lucide-react',
        '@xyflow/react',
        'tailwindcss'
      ],
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
