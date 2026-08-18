import { type PropsWithChildren } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { useBlogger } from "@/contexts/blogger";
import RootLayout from "./RootLayout";

export interface PageLayoutProps extends PropsWithChildren {}

export default function PageLayout({ children }: PageLayoutProps) {
	const { data } = useBlogger();

	return (
		<RootLayout>
			<Header title={data.header.title} logo={data.meta.favicon.src} />
			<div className="mx-auto max-w-5xl p-5">
				<div>{children}</div>
			</div>
			<Footer />
		</RootLayout>
	);
}
