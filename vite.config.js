import { defineConfig, loadEnv, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const jsxInJs = () => ({
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
        if (!/\/src\/.*\.js(?:\?.*)?$/.test(id)) {
            return null;
        }

        return transformWithOxc(code, id, {
            lang: 'jsx',
            jsx: {
                runtime: 'automatic',
            },
        });
    },
});

export default ({ mode }) => {

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: './',
        plugins:
            [jsxInJs(), react(), svgr()],
        optimizeDeps: {
            rolldownOptions: {
                moduleTypes: {
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
                // Vite 8 otherwise selects this package's CommonJS browser entry.
                'react-data-table-component': require.resolve(
                    'react-data-table-component/dist/index.es.js'
                ),
                url: require.resolve("url"),
            },
            dedupe: ['react', 'react-dom'],
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
            rolldownOptions: {
                output: {
                    entryFileNames: 'static/js/[name]-[hash].js',
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/css/[name].[hash].css',
                },
            },
        },
    })
}

