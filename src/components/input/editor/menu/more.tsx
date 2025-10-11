import type { Editor } from "@tiptap/react";
import { ListIcon, ListOrderedIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EditorMoreButton({ editor }: { editor: Editor }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button type="button" variant="ghost" size="icon-sm">
					<MoreHorizontalIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-0">
				<DropdownMenuItem asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
					>
						<ListIcon />
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
					>
						<ListOrderedIcon />
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
