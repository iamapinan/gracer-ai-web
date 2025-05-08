import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    {
      name: "mocha-error-reporter",

      // ref: https://vite.dev/guide/api-plugin.html#transformindexhtml
      transformIndexHtml(html) {
        return html;
      },

      transform(src: string, id: string) {
        if (id === "/app/src/main.tsx") {
          return src
        }
      },
    },
    viteStaticCopy({
      targets: [
        {
          src: 'assets/*',
          dest: 'assets'
        },
        {
          src: 'site.webmanifest',
          dest: ''
        },
        {
          src: 'robots.txt',
          dest: ''
        }
      ]
    })
  ],
  server: {
    allowedHosts: true,
  },
  publicDir: false,
  build: {
    copyPublicDir: false,
  },
});
