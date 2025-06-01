import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Base path para GitHub Pages
    base: process.env.NODE_ENV === 'production' ? '/lorenit/' : '/',

    // Optimizaciones de build
    build: {
        target: 'es2015',
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',

        // Configuración de chunks para mejor carga
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    icons: ['lucide-react']
                },
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name!.split('.');
                    const ext = info[info.length - 1];

                    if (/\.(mp3|wav|ogg|flac)$/i.test(assetInfo.name!)) {
                        return `assets/audio/[name]-[hash][extname]`;
                    }

                    if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name!)) {
                        return `assets/images/[name]-[hash][extname]`;
                    }

                    if (ext === 'css') {
                        return `assets/css/[name]-[hash][extname]`;
                    }

                    return `assets/[name]-[hash][extname]`;
                }
            }
        },

        // Configuración de terser para mejor minificación
        terserOptions: {
            compress: {
                drop_console: process.env.NODE_ENV === 'production',
                drop_debugger: true,
            },
        },
    },

    // Configuración de servidor de desarrollo
    server: {
        port: 3000,
        open: true,
        host: true,
    },

    // Configuración de preview
    preview: {
        port: 3000,
        open: true,
    },

    // Optimizaciones de assets
    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg'],

    // Configuración de resolve para mejor manejo de paths
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@components': resolve(__dirname, 'src/components'),
        }
    },

    // Configuración de optimización de dependencias
    optimizeDeps: {
        include: ['react', 'react-dom', 'lucide-react'],
    },

    // Configuración específica para GitHub Pages
    publicDir: 'public',

    // Headers para mejor carga de assets
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
});