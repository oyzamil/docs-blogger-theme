// TODO: currently experimenting with this one

import { type CSSProperties, useEffect, useRef, useState } from "react";

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
	const [wrapperStyle, setWrapperStyle] = useState<CSSProperties>({});
	const [artStyle, setArtStyle] = useState<CSSProperties>({});
	const wrapperRef = useRef<HTMLDivElement>(null);
	const artRef = useRef<HTMLDivElement>(null);

	const artWidth = 640;
	const artHeight = 360;

	useEffect(() => {
		const scale = () => {
			if (!wrapperRef.current || !artRef.current) {
				return;
			}

			const wrapperWidth = wrapperRef.current.clientWidth;
			const factor = wrapperWidth / artWidth;

			setWrapperStyle({
				height: `${artHeight * factor}px`,
			});
			setArtStyle({
				transformOrigin: "top left",
				transform: `scale(${factor})`,
			});
		};

		scale();

		window.addEventListener("resize", scale);
		return () => {
			window.removeEventListener("resize", scale);
		};
	}, []);

	return (
		<div
			ref={wrapperRef}
			style={wrapperStyle}
			className="mx-auto w-full max-w-2xl overflow-hidden rounded-md border"
		>
			<div
				ref={artRef}
				style={{
					width: 640,
					height: 360,
					...artStyle,
				}}
				className="relative bg-purple-50 p-[20px] text-gray-900 dark:bg-card dark:text-gray-50"
			>
				<span className="absolute top-12 right-0 left-0 border-border border-t" />
				<span className="absolute top-0 right-12 bottom-0 border-border border-r" />
				<span className="absolute right-0 bottom-12 left-0 border-border border-b" />
				<span className="absolute top-0 bottom-0 left-12 border-border border-l" />

				<div className="absolute top-12 right-12 left-12 flex items-center gap-3">
					<img
						alt={organization}
						src={logo}
						className="size-8 shrink-0 rounded-md object-cover object-center"
					/>
					<div className="grow truncate font-[440] text-xl">{organization}</div>
				</div>
				<div className="absolute right-12 bottom-12 left-12 grid gap-3">
					<div className="line-clamp-2 font-[500] text-4xl/[1.2]">{title}</div>
					<div className="line-clamp-2 text-xl/[1.25]">{description}</div>
				</div>
			</div>
		</div>
	);
}
