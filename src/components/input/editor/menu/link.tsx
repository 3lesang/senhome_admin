import type { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
	editor: Editor;
}

export function EditorLinkButton({ editor }: Props) {
	const [href, setHref] = useState("");
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					onClick={() => {
						setHref(editor.getAttributes("link").href);
					}}
				>
					<LinkIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chèn link</DialogTitle>
				</DialogHeader>
				<Input
					placeholder="http://"
					onChange={(e) => setHref(e.currentTarget.value)}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Hủy
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="button"
							onClick={() => {
								editor
									.chain()
									.focus()
									.extendMarkRange("link")
									.setLink({ href })
									.run();
							}}
						>
							Chèn Link
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
