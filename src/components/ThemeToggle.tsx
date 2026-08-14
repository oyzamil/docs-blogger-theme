import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { type MouseEvent, useRef } from "react";
import { useStore } from "zustand/react";

import { Button } from "@/components/ui/button";

import {
	preferencesStore,
	type ResolvedTheme,
	type Theme,
} from "@/stores/preferences";

const THEME_ORDER: Theme[] = ["light", "dark", "system"];

const THEME_ICON: Record<Theme, typeof SunIcon> = {
	light: SunIcon,
	dark: MoonStarIcon,
	system: MonitorIcon,
};

export function ThemeToggle() {
	const currentTheme = useStore(preferencesStore, (state) => state.theme);
	const setCurrentTheme = useStore(preferencesStore, (state) => state.setTheme);
	const darkMQRef = useRef<MediaQueryList | null>(
		window.matchMedia("(prefers-color-scheme: dark)"),
	);

	const resolveTheme = (theme: Theme): ResolvedTheme => {
		if (theme === "system") {
			return darkMQRef.current?.matches ? "dark" : "light";
		}
		return theme;
	};

	const setTheme = (theme: Theme, event?: MouseEvent) => {
		if (
			event &&
			resolveTheme(theme) !== resolveTheme(currentTheme) &&
			!document.documentElement.hasAttribute("data-astro-transition") &&
			!/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
			"startViewTransition" in document
		) {
			const x = event.clientX;
			const y = event.clientY;
			const width = window.innerWidth;
			const height = window.innerHeight;
			const endRadius = Math.hypot(
				Math.max(x, width - x),
				Math.max(y, height - y),
			);

			const transition = document.startViewTransition(() => {
				setCurrentTheme(theme);
			});

			transition.ready.then(() => {
				const duration = 600;
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${endRadius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration,
						easing: "cubic-bezier(.76,.32,.29,.99)",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			});
		} else {
			setCurrentTheme(theme);
		}
	};

	const cycleTheme = (event: MouseEvent) => {
		const nextTheme =
			THEME_ORDER[(THEME_ORDER.indexOf(currentTheme) + 1) % THEME_ORDER.length];
		setTheme(nextTheme, event);
	};

	const Icon = THEME_ICON[currentTheme];

	return (
		<Button variant="outline" size="icon" onClick={cycleTheme}>
			<Icon className="h-[1.2rem] w-[1.2rem]" />
			<span className="sr-only">Toggle theme (current: {currentTheme})</span>
		</Button>
	);
}
