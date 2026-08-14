import { useEffect, useMemo, useState } from "react";

import type { HighlightResult } from "@/utils/shiki";

import { cn } from "@/utils/cn";
import { highlight } from "@/utils/shiki/worker";

import {
	CodeBlockPre,
	CodeBlockRoot,
	type CodeBlockRootProps,
	LangIcon,
	Placeholder,
} from "./CodeBlock";

export interface DynamicCodeBlockProps extends CodeBlockRootProps {
	code: string;
	lang?: string;
}

export default function DynamicCodeBlock({
	code,
	lang,
	icon,
	className,
	style,
	...props
}: DynamicCodeBlockProps) {
	const [result, setResult] = useState<HighlightResult | null>();

	useEffect(() => {
		let cancelled = false;
		if (lang) {
			highlight(code, lang).then((res) => {
				if (!cancelled) {
					setResult(res);
				}
			});
		} else {
			setResult(null);
		}
		return () => {
			cancelled = true;
		};
	}, [code, lang]);

	const node = useMemo(() => {
		if (result) {
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Expected
			return <code dangerouslySetInnerHTML={{ __html: result.html }} />;
		}
		return <code>{<Placeholder code={code} />}</code>;
	}, [code, result]);

	return (
		<CodeBlockRoot
			{...props}
			icon={icon ?? (lang && <LangIcon lang={lang} />)}
			className={cn("shiki", className, result?.props.className)}
			style={{
				...result?.props.style,
				...style,
			}}
		>
			<CodeBlockPre>{node}</CodeBlockPre>
		</CodeBlockRoot>
	);
}
