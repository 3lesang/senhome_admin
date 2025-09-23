import type { Editor } from "@tiptap/react";
import { ImagePlusIcon } from "lucide-react";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";

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
