import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactSchemeAware',
      fileName: 'index',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'monaco-editor', '@monaco-editor/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'monaco-editor': 'monaco',
          '@monaco-editor/react': 'MonacoEditorReact',
        },
      },
    },
  },
});
