import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "@/components/editor/extensions";
import Menu from "@/components/editor/menu";
import "./styles.css";

interface EditorProps {
	content?: string;
	onChange?: (content: string) => void;
}

export default ({ content, onChange }: EditorProps) => {
	const editor: Editor = useEditor({
		extensions,
		editorProps: {
			attributes: {
				class: "typography text-sm focus:outline-none min-h-56 w-full mt-4",
			},
		},
		content: content ? JSON.parse(content) : undefined,
		onUpdate: ({ editor }) => {
			onChange?.(JSON.stringify(editor.getJSON()));
		},
	});

	return (
		<>
			<Menu editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
};
