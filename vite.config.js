import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);


export default ({ mode }) => {

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins:
            [react(), svgr()],
        esbuild: {
            loader: "jsx",
            include: /src\/.*\.jsx?$/,
            exclude: [],
        },
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js': 'jsx',
                },
            },
            include: ['react', 'react-dom'],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    includePaths: [
                        './node_modules/@uswds',
                        './node_modules/@uswds/uswds/packages',
                    ],
                },
            },
        },
        define: {
            'process.env': process.env,
        },
        resolve: {
            alias: {
                url: require.resolve("url"),
            },
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.js',
            coverage: {
                reporter: ['html', 'text', 'clover', 'json', 'lcov'],
                exclude: [
                    "src/config.js",
                    "src/serviceWorker.js",
                    "src/index.js",
                    "src/App.js",
                    "src/store/configureStore.dev.js",
                    "src/store/actions/actionTypes.js",
                    "src/store/reducers/index.js",
                    "src/store/reducers/initialState.js",
                    "src/utils/api/axiosSetup.js",
                    "src/utils/api/setupTests.js",
                ],
            },
        },
        server: {
            port: 3000,
        },
        build: {
            outDir: 'build',
            sourcemap: true,
            cssCodeSplit: false,
            rollupOptions: {
                output: {
                    entryFileNames: 'static/js/[name]-[hash].js',
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/css/[name].[hash].css',
                },
            },
        },
    })
}




