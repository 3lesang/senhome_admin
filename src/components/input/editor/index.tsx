import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder, UndoRedo } from "@tiptap/extensions";
import {
	type Editor,
	EditorContent,
	type JSONContent,
	useEditor,
} from "@tiptap/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditorMenu } from "./menu";
import "./styles.css";

interface TextEditorProps {
	value?: JSONContent;
	onChange?: (value: JSONContent) => void;
}

export function TextEditor({ value, onChange, ...props }: TextEditorProps) {
	const [focus, setFocus] = useState(false);
	const editor: Editor = useEditor({
		extensions,
		editorProps: {
			attributes: {
				class: "typography max-w-none text-sm outline-none",
			},
		},
		content: value,
		onUpdate: ({ editor }) => {
			onChange?.(editor.getJSON());
		},
		onFocus() {
			setFocus(true);
		},
		onBlur() {
			setFocus(false);
		},
	});

	return (
		<div
			className={cn(
				"dark:bg-input/30 border-input rounded-md border bg-transparent shadow-xs transition-[color,box-shadow]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				focus && "ring-ring/50 ring-[3px] border-ring",
			)}
			{...props}
		>
			<EditorMenu editor={editor} />
			<EditorContent
				editor={editor}
				className="max-h-80 min-h-44 overflow-scroll px-4"
			/>
		</div>
	);
}

const extensions = [
	Document,
	Paragraph,
	Text,
	Bold,
	Italic,
	Underline,
	Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
	Placeholder.configure({
		placeholder: "Nhập nội dung...",
	}),
	TextAlign.configure({
		types: ["heading", "paragraph"],
	}),
	Image,
	Link.configure({
		openOnClick: false,
		autolink: true,
	}),
	BulletList,
	OrderedList,
	ListItem,
	UndoRedo,
	Youtube.configure({
		nocookie: true,
	}).extend({
		addAttributes() {
			return {
				...this.parent?.(),
				width: {
					default: "100%",
				},
			};
		},
	}),
];
