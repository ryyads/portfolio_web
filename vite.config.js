import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If you host in a sub-folder (e.g. GitHub Pages at /Portfolio/), set base: '/Portfolio/'
export default defineConfig({ plugins: [react()], base: '/' });
