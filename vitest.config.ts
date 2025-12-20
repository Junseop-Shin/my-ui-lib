import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts',
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // Explicitly set jsdom environment options if needed
        environmentOptions: {
            jsdom: {
                resources: 'usable',
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
