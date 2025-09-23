import type { Editor } from "@tiptap/react";
import { Bold, Italic, UnderlineIcon } from "lucide-react";
import Align from "@/components/editor/menu/align";
import Image from "@/components/editor/menu/image";
import Link from "@/components/editor/menu/link";
import More from "@/components/editor/menu/more";
import Paragraph from "@/components/editor/menu/paragraph";
import Video from "@/components/editor/menu/video";
import { Button } from "@/components/ui/button";

export default ({ editor }: { editor: Editor }) => {
	return (
		<div className="sticky top-0 bg-white flex items-center flex-wrap">
			<Paragraph editor={editor} />
			<Button
				type="button"
				variant="ghost"
				size="icon"
				aria-label="Toggle bold"
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				aria-label="Toggle italic"
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic />
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				aria-label="Toggle strikethrough"
				onClick={() => editor.chain().focus().toggleUnderline().run()}
			>
				<UnderlineIcon />
			</Button>
			<Align editor={editor} />
			<Link editor={editor} />
			<Image editor={editor} />
			<Video editor={editor} />
			<More editor={editor} />
		</div>
	);
};
