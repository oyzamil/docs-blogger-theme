import { LoaderCircle } from "lucide-react";
import { type PropsWithChildren } from "react";
import { ScrollRestoration, useNavigation } from "react-router";

import Toaster from "@/components/Toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export interface RootLayoutProps extends PropsWithChildren {}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<TooltipProvider>
			<svg width="0" height="0" aria-hidden="true" className="absolute">
				<defs>
					<filter id="filter-rough">
						<feTurbulence
							type="fractalNoise"
							baseFrequency=".08"
							numOctaves="4"
						/>
						<feDisplacementMap in="SourceGraphic" scale="5" />
					</filter>
				</defs>
			</svg>
			{children}
			<Toaster
				richColors
				style={{
					fontFamily: "var(--font-sans)",
				}}
			/>
			<NavigationLoader />
			<ScrollRestoration />
		</TooltipProvider>
	);
}

function NavigationLoader() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	if (isNavigating) {
		return (
			<div className="fixed right-4 bottom-4 flex size-9 items-center justify-center rounded-md border bg-background shadow-sm">
				<LoaderCircle className="animate-spin" size={16} />
			</div>
		);
	}
}
