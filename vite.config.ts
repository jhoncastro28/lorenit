import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Base path para GitHub Pages
    base: '/lorenit/',

    // Optimizaciones de build
    build: {
        target: 'es2015',
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',

        // Configuración específica para GitHub Pages
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
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

        // Configuración de terser
        terserOptions: {
            compress: {
                drop_console: true,
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

    // Assets incluidos
    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg'],

    // Resolve configuration
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@components': resolve(__dirname, 'src/components'),
        }
    },

    // Optimización de dependencias
    optimizeDeps: {
        include: ['react', 'react-dom', 'lucide-react'],
    },

    // Configuración del directorio público
    publicDir: 'public',
});