import type { Theme } from "@/stores/preferences";

export const PREFERENCES_KEY: string = "app:preferences";
export const PREFERENCES_VERSION: number = 0;

export const DEFAULT_THEME: Theme = "system";

export const siteInfo = {
	name: "observerkit",
	description:
		"Unified, typed, tree-shakeable wrapper over the browser's native Observer APIs — MutationObserver, ResizeObserver, IntersectionObserver, PerformanceObserver, and ReportingObserver. Built to replace arrive.js-style polling/mutation hacks in browser extensions and content scripts with something fast and typed.",
	installCmd: [
		"bun add observekit",
		"pnpm add observekit",
		"npm install observekit",
	],
};
