import { Link } from "react-router";

import MarqyRibbon from "@/pages/sections/MarqueeRibbon";
import { ThemeToggle } from "./ThemeToggle";

export interface HeaderProps {
	title: string;
	logo?: string;
}

export default function Header({ title, logo }: HeaderProps) {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur-sm">
			<MarqyRibbon />
			<div className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-4 px-5 py-2.5">
				<Link
					prefetch="viewport"
					className="flex shrink-0 items-center justify-center gap-3"
					to="/"
				>
					{logo && <img src={logo} alt={title} className="size-8" />}
					<span className="font-medium text-lg capitalize">{title}</span>
				</Link>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
