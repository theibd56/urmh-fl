import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                catalogIndex: resolve(__dirname, './pages/catalog/catalog-page.html'),
                productIndex: resolve(__dirname, './pages/product/product-page.html'),
                subcategories: resolve(__dirname, './pages/catalog/subcategories-page.html'),
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'assets/[name][extname]'
                    }
                    return 'assets/[name][extname]'
                },
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
        }),
    ],
})