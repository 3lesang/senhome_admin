import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditIcon, GripVerticalIcon, PlusIcon, Trash2Icon } from "lucide-react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "../ui/button";
import type { TreeItem } from "./types";

interface SortableItemProps {
	node: TreeItem;
	depth: number;
	collapsed: Record<string, boolean>;
	toggleCollapse: (id: string) => void;
	onAdd?: (id: string) => void;
	onUpdate?: (id: string) => void;
	onRemove?: (id: string) => void;
}

export function SortableItem({
	node,
	depth,
	toggleCollapse,
	onAdd,
	onUpdate,
	onRemove,
}: SortableItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: node.id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		paddingLeft: depth * 20,
	};

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<div ref={setNodeRef} style={style}>
					<Button
						type="button"
						variant="ghost"
						className="justify-start w-full"
						onClick={() => {
							toggleCollapse(node.id);
						}}
					>
						<span {...attributes} {...listeners} className="cursor-grab">
							<GripVerticalIcon />
						</span>
						{node.title}
					</Button>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => onAdd?.(node.id)}>
					<PlusIcon />
					Thêm
				</ContextMenuItem>
				<ContextMenuItem onClick={() => onUpdate?.(node.id)}>
					<EditIcon />
					Chỉnh sửa
				</ContextMenuItem>
				<ContextMenuItem onClick={() => onRemove?.(node.id)}>
					<Trash2Icon />
					Xóa
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
