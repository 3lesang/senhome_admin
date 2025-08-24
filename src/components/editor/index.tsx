import { extensions } from "@/components/editor/extensions";
import Menu from "@/components/editor/menu";
import { EditorContent, useEditor } from "@tiptap/react";

interface EditorProps {
  content?: string;
}

export default ({ content }: EditorProps) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base focus:outline-none min-h-56 max-w-none w-full",
      },
    },
    content,
  });
  return (
    <div>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
