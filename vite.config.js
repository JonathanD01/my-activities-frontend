import MillionLint from '@million/lint';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const _plugins = [react()];
_plugins.unshift(MillionLint.vite())
export default defineConfig({
  base: "",
  plugins: _plugins,
  preview: {
    port: 3000,
    strictPort: true
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000"
  }
});