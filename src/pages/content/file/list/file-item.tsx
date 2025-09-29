import { InfoIcon, Trash2Icon } from "lucide-react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { FileType } from "@/types/file";

interface FileItemProps {
	data?: FileType;
}

export default function FileItem({ data }: FileItemProps) {
	return (
		<div className="relative">
			<ContextMenu>
				<ContextMenuTrigger>
					<img
						src={data?.url}
						width={100}
						height={100}
						className="object-contain aspect-square w-full select-none"
						aria-label="image"
						loading="lazy"
						alt=""
					/>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>
						<InfoIcon />
						Xem chi tiết
					</ContextMenuItem>
					<ContextMenuItem>
						<Trash2Icon />
						Xóa
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
}
