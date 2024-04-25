import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: "./src",
    plugins: [],
    build: {
        outDir: "../build",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, "src/index.html"),
                form: resolve(__dirname, "src/photographer.html"),
            },
        },
    },
});
