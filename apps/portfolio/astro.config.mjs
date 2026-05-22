import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  publicDir: path.resolve(__dirname, "../site/public"),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@data": path.resolve(__dirname, "../../data"),
      },
    },
  },
});
