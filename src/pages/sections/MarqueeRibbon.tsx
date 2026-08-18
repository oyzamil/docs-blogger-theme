import { Marqy } from "marqy";
import "marqy/dist/marqy.css";

import type React from "react";

import { cn } from "@/utils/cn";

type MarqyRibbonTheme = "blend" | "yellow" | "red" | "blue" | "green";

interface MarqyRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
	message?: React.ReactNode;
	badge?: string | null;
	ctaText?: string | null;
	ctaHref?: string;
	repeat?: number;
	pauseOnHover?: boolean;
	theme?: MarqyRibbonTheme;
}

interface RibbonThemeClasses {
	root: string;
	badge: string;
	badgeText: string;
	badgePill: string;
	divider: string;
	messageText: string;
	cta: string;
	ctaHover: string;
}

const themeClasses: Record<MarqyRibbonTheme, RibbonThemeClasses> = {
	blend: {
		root: "bg-black dark:bg-[#f0f0f0]",
		badge: "bg-black dark:bg-[#f0f0f0]",
		badgeText: "text-gray-700 dark:text-black/10",
		badgePill:
			"bg-[#f0f0f0]/20 text-[#f0f0f0] dark:bg-black/80 dark:text-[#f0f0f0]",
		divider: "border-white/30 dark:border-black/10",
		messageText: "text-[#f0f0f0] dark:text-black",
		cta: "bg-black text-[#f0f0f0]/70 dark:bg-[#f0f0f0] dark:text-black/70",
		ctaHover: "hover:text-[#f0f0f0] dark:hover:text-black",
	},
	yellow: {
		root: "bg-[#ffcc00] dark:bg-yellow-800",
		badge: "bg-[#ffcc00] dark:bg-yellow-800",
		badgeText: "text-neutral-900 dark:text-white",
		badgePill: "bg-black/10 text-neutral-900 dark:bg-black/15 dark:text-white",
		divider: "border-black/8 dark:border-black/10",
		messageText: "text-neutral-900 dark:text-white",
		cta: "bg-[#ffcc00] text-neutral-800/60 dark:bg-yellow-800 dark:text-white/60",
		ctaHover: "hover:text-neutral-900 dark:hover:text-neutral-900",
	},
	red: {
		root: "bg-red-500 dark:bg-red-800",
		badge: "bg-red-500 dark:bg-red-800",
		badgeText: "text-white dark:text-white",
		badgePill: "bg-white/20 text-white dark:bg-white/15 dark:text-white",
		divider: "border-white/20 dark:border-white/15",
		messageText: "text-white dark:text-white",
		cta: "bg-red-500 text-white/70 dark:bg-red-800 dark:text-white/60",
		ctaHover: "hover:text-white dark:hover:text-white",
	},
	blue: {
		root: "bg-[#009cf5] dark:bg-[#015382]",
		badge: "bg-[#009cf5] dark:bg-[#015382]",
		badgeText: "text-white dark:text-white",
		badgePill: "bg-white/20 text-white dark:bg-white/15 dark:text-white",
		divider: "border-white/20 dark:border-white/15",
		messageText: "text-white dark:text-white",
		cta: "bg-[#009cf5] text-white/70 dark:bg-[#015382] dark:text-white/60",
		ctaHover: "hover:text-white dark:hover:text-white",
	},
	green: {
		root: "bg-[#187b4d] dark:bg-[#0e4f31]",
		badge: "bg-[#187b4d] dark:bg-[#0e4f31]",
		badgeText: "text-white dark:text-white",
		badgePill: "bg-white/20 text-white dark:bg-white/15 dark:text-white",
		divider: "border-white/20 dark:border-white/15",
		messageText: "text-white dark:text-white",
		cta: "bg-[#187b4d] text-white/70 dark:bg-[#0e4f31] dark:text-white/60",
		ctaHover: "hover:text-white dark:hover:text-white",
	},
};

function DefaultMessage({
	messageClass,
	messages = [
		"Ship faster, break nothing.",
		"Accessibility wins.",
		"Core Web Vitals first.",
		"DX > hype.",
		"Components, not chaos.",
		"Performance is feature.",
		"Design systems that stick.",
		"Code review with empathy.",
		"Automate everything.",
	],
}: {
	messageClass?: string;
	messages?: string[];
}) {
	return (
		<span
			className={cn(
				"flex items-center justify-center gap-8 whitespace-nowrap pr-8 font-light",
				messageClass,
			)}
		>
			{messages.flatMap((msg, i) => [
				<span key={`msg-${i}`}>{msg}</span>,
				i < messages.length - 1 ? <span key={`dot-${i}`}>•</span> : null,
			])}
		</span>
	);
}

export default function MarqyRibbon({
	message,
	badge = "NEW",
	ctaText = "Hire Now",
	ctaHref = "https://wa.me/923038088869",
	repeat = 0,
	pauseOnHover = true,
	theme = new Date().getDate() === 14 && new Date().getMonth() === 7
		? "green"
		: "blend",
	className,
	...props
}: MarqyRibbonProps) {
	const t = themeClasses[theme];

	const content = message ?? <DefaultMessage messageClass={t.messageText} />;

	return (
		<div
			className={cn(
				"relative hidden h-11 w-full items-center overflow-hidden border-x md:flex",
				t.root,
				className,
			)}
			{...props}
		>
			{/* Badge */}
			{badge && (
				<div
					className={cn(
						"relative z-30 flex shrink-0 items-center self-stretch border-r px-4",
						t.badge,
						t.divider,
					)}
				>
					<span
						className={cn(
							"rounded-full px-2.5 py-px font-mono font-semibold text-[10px] uppercase tracking-widest",
							t.badgePill,
						)}
					>
						{badge}
					</span>
				</div>
			)}

			<div className="flex-1 overflow-hidden">
				<Marqy pauseOnHover={pauseOnHover}>{content}</Marqy>
			</div>

			{/* CTA */}
			{ctaText && (
				<div
					className={cn(
						"relative z-30 flex shrink-0 items-center self-stretch border-l px-4",
						t.cta,
						t.divider,
					)}
				>
					<a
						href={ctaHref}
						className={cn(
							"font-mono font-semibold text-xs uppercase tracking-widest",
						)}
					>
						{ctaText}
					</a>
				</div>
			)}
		</div>
	);
}
