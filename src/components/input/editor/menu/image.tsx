import type { Editor } from "@tiptap/react";
import { ImagePlusIcon } from "lucide-react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";

export function EditorImageButton({ editor }: { editor: Editor }) {
	return (
		<FileDialog
			value={[]}
			onConfirm={(files) => {
				const [file] = files;
				if (file?.id) editor.chain().focus().setImage({ src: file.url }).run();
			}}
		>
			<Button type="button" variant="ghost" size="icon-sm">
				<ImagePlusIcon />
			</Button>
		</FileDialog>
	);
}
