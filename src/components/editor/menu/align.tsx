import type { Editor } from "@tiptap/react";
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default ({ editor }: { editor: Editor }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button type="button" variant="ghost">
					<AlignLeftIcon />
					<ChevronDownIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-0">
				<DropdownMenuItem asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
					>
						<AlignLeftIcon />
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						className={
							editor.isActive({ textAlign: "center" }) ? "is-active" : ""
						}
					>
						<AlignCenterIcon />
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						className={
							editor.isActive({ textAlign: "right" }) ? "is-active" : ""
						}
					>
						<AlignRightIcon />
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => editor.chain().focus().setTextAlign("justify").run()}
						className={
							editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
						}
					>
						<AlignJustifyIcon />
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
