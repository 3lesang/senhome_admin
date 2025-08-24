import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import type { Editor } from "@tiptap/react";
import { Bold, ImagePlusIcon, Italic, UnderlineIcon } from "lucide-react";
import Align from "./align";
import Link from "./link";
import More from "./more";
import Paragraph from "./paragraph";
import Video from "./video";

export default ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center flex-wrap">
      <Paragraph editor={editor} />
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle strikethrough"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </Button>
      <Align editor={editor} />
      <Link editor={editor} />
      <FileInput
        mode="single"
        render={({ handleOpen }) => {
          return (
            <Button variant="ghost" size="icon" onClick={handleOpen}>
              <ImagePlusIcon />
            </Button>
          );
        }}
        onChange={(files) => {
          const url = files?.[0]?.url;
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      />
      <Video editor={editor} />
      <More editor={editor} />
    </div>
  );
};
