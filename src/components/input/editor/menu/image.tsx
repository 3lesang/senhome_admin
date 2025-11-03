import type { Editor } from "@tiptap/react";
import { ImagePlusIcon } from "lucide-react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";
import { convertToFileUrl } from "@/lib/utils";

export function EditorImageButton({ editor }: { editor: Editor }) {
  return (
    <FileDialog
      value={[]}
      onConfirm={(files) => {
        const [file] = files;
        if (file)
          editor
            .chain()
            .focus()
            .setImage({ src: convertToFileUrl(file) })
            .run();
      }}
    >
      <Button type="button" variant="ghost" size="icon-sm">
        <ImagePlusIcon />
      </Button>
    </FileDialog>
  );
}
