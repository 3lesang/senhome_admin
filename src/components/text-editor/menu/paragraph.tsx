import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
	editor: Editor;
}

export function EditorParagraphButton({ editor }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="select-none" type="button" size="sm">
					Paragraph
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="typography">
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						size="sm"
						variant="ghost"
						onClick={() => editor.chain().focus().setParagraph().run()}
					>
						Paragraph
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
					>
						<h1>Heading 1</h1>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
					>
						<h2>Heading 2</h2>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
					>
						<h3>Heading 3</h3>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 4 }).run()
						}
					>
						<h4>Heading 4</h4>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 5 }).run()
						}
					>
						<h5>Heading 5</h5>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						className="w-full justify-start"
						variant="ghost"
						size="sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 6 }).run()
						}
					>
						<h6>Heading 6</h6>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
