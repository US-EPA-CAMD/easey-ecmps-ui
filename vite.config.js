import { defineConfig, loadEnv, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// Vite 8 transforms JS with Oxc instead of esbuild. Oxc decides JSX support from the
// file extension, so JSX in plain `.js` files is rejected ("JSX syntax is disabled").
// There is no `oxc` config option for this (OxcOptions omits `lang`), so we run a pre
// transform on src `.js` files. Replaces the deprecated `esbuild`/`optimizeDeps.esbuildOptions`
// loader config. Uses the automatic runtime so files need not `import React`.
const jsxInJs = () => ({
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
        if (!/\/src\/.*\.js$/.test(id.split('?')[0])) return null;
        return transformWithOxc(code, id, {
            lang: 'jsx',
            jsx: { runtime: 'automatic' },
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




