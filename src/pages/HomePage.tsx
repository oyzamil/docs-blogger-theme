import { resizeImage } from "blogr-plugins";
import { HashIcon } from "lucide-react";
import { Link } from "react-router";

import type { PostMinimal } from "@/lib/blogger";

import StructuredData from "@/components/StructuredData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useBlogger } from "@/contexts/blogger";
import Hero from "./sections/Hero";

export default function HomePage() {
	const { data } = useBlogger();

	return (
		<>
			<StructuredData
				data={{
					"@context": "https://schema.org",
					"@type": "WebSite",
					url: data.blog.canonicalHomepageUrl,
					name: data.blog.title,
					alternateName: data.blog.title,
					potentialAction: {
						"@type": "SearchAction",
						target: `${data.blog.searchUrl}?q={search_term_string}`,
						"query-input": "required name=search_term_string",
					},
				}}
			/>
			<Hero />
			<div className="mt-4 flex flex-col gap-4">
				{data.featured && (
					<>
						<h2 className="font-bold text-xl">🔥 Featured post</h2>
						<PostCard post={data.featured.post} />
					</>
				)}
				<h2 className="font-bold text-xl">Latest posts</h2>
				{Object.values(data.posts).map((post) => (
					<PostCard key={post.id} post={post} />
				))}

				{/* <h2 className="font-bold text-xl">Blog authors</h2>
				<div className="flex flex-col gap-5">
					{data.authors.map((author) => (
						<BlogAuthorCard key={author.id} author={author} />
					))}
				</div> */}
			</div>
		</>
	);
}

function PostCard({ post }: { post: PostMinimal }) {
	return (
		<div className="flex flex-col rounded-md border p-4">
			<Link
				prefetch="viewport"
				className="mb-1 font-semibold text-lg hover:underline"
				to={post.url}
			>
				{post.title}
			</Link>
			<div
				className="mb-2 text-muted-foreground text-sm"
				dangerouslySetInnerHTML={{ __html: post.summary }}
			/>
			<div className="flex flex-wrap items-center gap-x-2 text-muted-foreground text-xs">
				<div className="flex items-center gap-x-1.5">
					<Avatar className="size-5 rounded-full">
						{post.author.image && (
							<AvatarImage
								alt={post.author.name}
								src={resizeAvatarImage(post.author.image, 35)}
							/>
						)}
						<AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<span>{post.author.name}</span>
				</div>
				<Separator orientation="vertical" className="h-4!" />
				<span>{post.publishedTimestamp}</span>
			</div>
			{post.labels.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{post.labels.map((label) => (
						<Badge
							asChild
							key={label}
							variant="secondary"
							className="flex items-center gap-x-1"
						>
							<Link
								prefetch="viewport"
								to={`/search/label/${encodeURI(label)}`}
							>
								<HashIcon className="size-3" />
								{label}
							</Link>
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}

// function BlogAuthorCard({ author }: { author: BlogAuthor }) {
// 	return (
// 		<div className="flex items-center gap-3 rounded-md border p-4">
// 			<Avatar>
// 				{author.image && (
// 					<AvatarImage
// 						className="object-cover object-center"
// 						alt={author.name}
// 						src={resizeAvatarImage(author.image, 40)}
// 					/>
// 				)}
// 				<AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
// 			</Avatar>
// 			<div>{author.name}</div>
// 		</div>
// 	);
// }

function resizeAvatarImage(source: string, size: number) {
	return resizeImage(source, {
		height: size,
		width: size,
	});
}
