import { extensions } from "@/components/editor/extensions";
import Menu from "@/components/editor/menu";
import { Editor, EditorContent, useEditor } from "@tiptap/react";

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

export default ({ content, onChange }: EditorProps) => {
  const editor: Editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base focus:outline-none min-h-56 max-w-none w-full",
      },
    },
    content: content ? JSON.parse(content) : undefined,
    onUpdate: ({ editor }) => {
      onChange?.(JSON.stringify(editor.getJSON()));
    },
  });

  return (
    <div>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
