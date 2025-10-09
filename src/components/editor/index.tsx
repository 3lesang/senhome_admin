import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/components/editor/extensions";
import Menu from "@/components/editor/menu";
import "./styles.css";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EditorProps {
	content?: string;
	onChange?: (content: string) => void;
}

export default ({ content, onChange }: EditorProps) => {
	const [focus, setFocus] = useState(false);
	const editor: Editor = useEditor({
		extensions,
		editorProps: {
			attributes: {
				class: "typography max-w-none text-sm outline-none",
			},
		},
		content: content ? JSON.parse(content) : undefined,
		onUpdate: ({ editor }) => {
			onChange?.(JSON.stringify(editor.getJSON()));
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
				"border border-input shadow-xs rounded-md overflow-hidden transition-[color,box-shadow] bg-transparent",
				focus && "ring-ring/50 ring-[3px] border-ring",
			)}
		>
			<div className="p-2">
				<Menu editor={editor} />
			</div>
			<div className="max-h-80 min-h-44 overflow-scroll p-4">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
