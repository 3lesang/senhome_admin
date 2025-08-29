import FileInput from "@/components/media/file-input";
import { Button } from "@/components/ui/button";
import type { Editor } from "@tiptap/react";
import { ImagePlusIcon } from "lucide-react";

export default ({ editor }: { editor: Editor }) => {
  return (
    <FileInput
      mode="single"
      render={({ handleOpen }) => {
        return (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleOpen}
          >
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
  );
};
