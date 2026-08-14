import { siteInfo } from "@/constants";
import { useBlogger } from "@/contexts/blogger";

export default function Hero() {
	const { data } = useBlogger();
	return (
		<section>
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-5 sm:px-6 lg:space-y-10 lg:px-8 lg:py-28">
				<div className="space-y-6 text-center lg:space-y-10">
					<h1 className="bg-linear-30 from-black via-theme to-theme bg-clip-text font-bold font-heading text-5xl text-transparent capitalize tracking-wide lg:text-8xl">
						{data.blog.title}
					</h1>

					<p>{data.blog.description}</p>
				</div>

				{/* terminal panel signature element */}
				<div className="mx-auto max-w-2xl overflow-hidden rounded-xl border bg-foreground text-left shadow-xl">
					<div className="flex items-center gap-1.5 border-background/10 border-b p-4">
						<span className="h-2.5 w-2.5 rounded-full bg-destructive" />
						<span className="h-2.5 w-2.5 rounded-full bg-warning" />
						<span className="h-2.5 w-2.5 rounded-full bg-success" />
					</div>
					<div className="px-5 py-5 font-mono text-muted text-sm">
						<span>{siteInfo.installCmd[0]}</span>{" "}
						<span className="animate-caret-blink">
							<span className="-mb-0.5 inline-block h-4.5 w-0.5 bg-white"></span>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
