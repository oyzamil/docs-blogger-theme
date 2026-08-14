import { HomeIcon } from "lucide-react";
import { Link } from "react-router";

import { cn } from "@/utils/cn";

import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>404 Not Found</CardTitle>
					<CardDescription>
						The page you've requested can't be found.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link className={cn(buttonVariants(), "w-full")} to="/">
						<HomeIcon /> Home
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
