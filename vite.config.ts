import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import blogger from "blogger-plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
	return {
		base: `https://cdn.jsdelivr.net/gh/oyzamil/docs-blogger-theme/dist/`,

		plugins: [
			react(),
			tailwindcss(),
			tsconfigPaths(),
			blogger({
				proxyBlog: "https://muzammil-dev.blogspot.com/",
				modules: ["src/index.tsx"],
				styles: ["src/styles/globals.css"],
				template: "src/template.xml",
				xml: {
					tags: true,
					minify: true,
				},
			}),
		],

		build: {
			sourcemap: false,
		},
	};
});

// this.input = `__blogger_plugin_virtual__/${this.name}.html`;
