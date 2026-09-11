import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const alias = {
    '@': path.resolve(__dirname, './src'),
};

export default defineConfig({
    test: {
        projects: [
            {
                plugins: [react()],
                resolve: { alias },
                test: {
                    name: 'unit',
                    include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.tsx'],
                    environment: 'jsdom',
                    globals: true,
                    setupFiles: './vitest.setup.ts',
                    alias,
                    // Explicitly set jsdom environment options if needed
                    environmentOptions: {
                        jsdom: {
                            resources: 'usable',
                        },
                    },
                },
            },
            {
                // 토큰 파리티는 CSS 파일을 디스크에서 읽는다. jsdom 변환 모드는
                // import.meta.url을 self.location으로 바꿔 경로가 깨지므로 node로 돌린다.
                // 컴포넌트를 렌더하는 test/*.test.tsx는 jsdom이 필요해 unit이 맡는다.
                test: {
                    name: 'tokens',
                    include: ['test/**/*.test.ts'],
                    environment: 'node',
                },
            },
        ],
    },
    resolve: { alias },
});
