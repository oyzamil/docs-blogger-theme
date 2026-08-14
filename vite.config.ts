import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import blogger from "blogger-plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import * as packageJson from "./package.json";

const REPOSITORY = "oyzamil/docs-blogger-theme";
const DEV_BRANCH = "static-dev";

export default defineConfig(({ mode }) => {
	const APP_BASE =
		mode === "development"
			? `https://cdn.jsdelivr.net/gh/${REPOSITORY}@${DEV_BRANCH}/${packageJson.name}/dist/`
			: `https://cdn.jsdelivr.net/gh/${REPOSITORY}@${packageJson.name}@${packageJson.version}/dist/`;

	return {
		base: APP_BASE,

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
