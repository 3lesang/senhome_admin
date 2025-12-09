import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface FilePreviewProps {
	children: ReactNode;
	render: () => ReactNode;
}

export function FilePreview({ children, render }: FilePreviewProps) {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent
				className="min-w-fit p-0 border-0 shadow-none"
				showCloseButton={false}
			>
				{render()}
			</DialogContent>
		</Dialog>
	);
}
