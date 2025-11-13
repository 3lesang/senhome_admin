import type { Editor } from "@tiptap/react";
import { Bold, Italic, UnderlineIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { EditorAlignButton } from "./align";
import { EditorImageButton } from "./image";
import { EditorLinkButton } from "./link";
import { EditorMoreButton } from "./more";
import { EditorParagraphButton } from "./paragraph";
import { EditorVideoButton } from "./video";

function EditorMenuComponent({ editor }: { editor: Editor }) {
	return (
		<div className="flex items-center p-1 bg-neutral-50/20">
			<EditorParagraphButton editor={editor} />
			<Button
				type="button"
				variant="ghost"
				size="icon-sm"
				aria-label="Toggle bold"
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold size={4} />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon-sm"
				aria-label="Toggle italic"
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon-sm"
				aria-label="Toggle strikethrough"
				onClick={() => editor.chain().focus().toggleUnderline().run()}
			>
				<UnderlineIcon />
			</Button>
			<EditorAlignButton editor={editor} />
			<EditorLinkButton editor={editor} />
			<EditorImageButton editor={editor} />
			<EditorVideoButton editor={editor} />
			<EditorMoreButton editor={editor} />
		</div>
	);
}

export const EditorMenu = React.memo(EditorMenuComponent);
