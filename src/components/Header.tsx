import { Link } from "react-router";

import { ThemeToggle } from "./ThemeToggle";
import MarqyRibbon from "@/pages/sections/MarqueeRibbon";

export interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/50 backdrop-blur-sm">
			<MarqyRibbon />
			<div className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-4 px-5 py-2.5">
				<Link
					className="flex shrink-0 items-center justify-center gap-3"
					to="/"
				>
					<span className="font-medium text-lg">{title}</span>
				</Link>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
