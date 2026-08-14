export interface ThumbnailProps {
	logo: string;
	organization: string;
	title: string;
	description: string;
}

export default function Thumbnail({
	logo,
	description,
	organization,
	title,
}: ThumbnailProps) {
	return (
		<div
			className="@container mx-auto w-full max-w-full overflow-hidden rounded-md border  p-4"
			style={{
				background: `
                radial-gradient(circle at 50% -10%, rgba(163, 230, 53, 0.55) 0%, transparent 60%),
                radial-gradient(circle at 105% 35%, rgba(6, 182, 212, 0.55) 0%, transparent 60%),
                radial-gradient(circle at 35% 105%, rgba(34, 197, 94, 0.5) 0%, transparent 55%),
                radial-gradient(circle at -5% 60%, rgba(20, 184, 166, 0.25) 0%, transparent 50%),
                linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(6, 182, 212, 0.15) 100%)
              `,
			}}
		>
			<div className="relative aspect-video w-full p-[3.125cqw] text-foreground bg-card/80 rounded-md">
				<span className="absolute top-[7.5cqw] right-0 left-0 border-t" />
				<span className="absolute top-0 right-[7.5cqw] bottom-0 border-r" />
				<span className="absolute right-0 bottom-[7.5cqw] left-0 border-b" />
				<span className="absolute top-0 bottom-0 left-[7.5cqw] border-l" />

				<div className="absolute top-[8.125cqw] right-[8.125cqw] left-[8.125cqw] flex items-center gap-[0.875cqw]">
					<img
						alt={organization}
						src={logo}
						className="size-[5cqw] shrink-0 rounded-full object-cover object-center"
					/>
					<span className="text-[2.5cqw]">by</span>
					<div className="grow truncate font-semibold text-[3.125cqw] font-heading">
						{organization}
					</div>
				</div>
				<div className="absolute right-[8.125cqw] bottom-[8.125cqw] left-[8.125cqw] grid gap-[0.625cqw] text-center">
					<div className="line-clamp-2 text-[5.625cqw]/[1.2] font-heading font-black">
						{title}
					</div>
					<div className="line-clamp-1 text-[1.875cqw]">{description}</div>
				</div>
			</div>
		</div>
	);
}
