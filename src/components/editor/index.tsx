import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/components/editor/extensions";
import Menu from "@/components/editor/menu";
import "./styles.css";
import { ScrollArea } from "../ui/scroll-area";

interface EditorProps {
	content?: string;
	onChange?: (content: string) => void;
}

export default ({ content, onChange }: EditorProps) => {
	const editor: Editor = useEditor({
		extensions,
		editorProps: {
			attributes: {
				class: "typography max-w-none text-sm",
			},
		},
		content: content ? JSON.parse(content) : undefined,
		onUpdate: ({ editor }) => {
			onChange?.(JSON.stringify(editor.getJSON()));
		},
	});

	return (
		<ScrollArea className="max-h-96">
			<Menu editor={editor} />
			<EditorContent editor={editor} />
		</ScrollArea>
	);
};
