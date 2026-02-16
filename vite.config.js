import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                mainPage: resolve(__dirname, 'index.html'),
                catalogPage: resolve(__dirname, './pages/catalog/catalog-page.html'),
                productPage: resolve(__dirname, './pages/product/product-page.html'),
                productSale: resolve(__dirname, './pages/product/product-sale-page.html'),
                productDoublePrice: resolve(__dirname, './pages/product/product-doublePrice-page.html'),
                subcategoriesPage: resolve(__dirname, './pages/catalog/subcategories-page.html'),
                blogPage: resolve(__dirname, './pages/blog/blog-page.html'),
                assetsPage: resolve(__dirname, './pages/assets/assets-page.html'),
                errorPage: resolve(__dirname, './pages/error/error-page.html'),
                leasingPage: resolve(__dirname, './pages/leasing/leasing-page.html'),
                faqPage: resolve(__dirname, './pages/faq/faq-page.html'),
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