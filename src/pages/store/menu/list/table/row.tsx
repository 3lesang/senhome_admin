import { Link } from "@tanstack/react-router";
import { EditIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { MenuType } from "@/types/menu";

interface MenuRowProps {
	data: MenuType;
	onDelete?: (id: string) => void;
}

export default function MenuRow({ data, onDelete }: MenuRowProps) {
	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<TableRow>
					<TableCell className="w-8 pl-6">
						<Checkbox />
					</TableCell>
					<TableCell>
						<Link
							to="/store/menus/$id"
							params={{ id: data.id }}
							className="hover:underline"
						>
							{data?.name}
						</Link>
					</TableCell>
					<TableCell>{data?.position}</TableCell>
				</TableRow>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<Link to="/store/menus/$id" params={{ id: data.id }}>
					<ContextMenuItem>
						<EditIcon />
						Chỉnh sửa
					</ContextMenuItem>
				</Link>
				<ContextMenuItem onClick={() => onDelete?.(data.id)}>
					<TrashIcon />
					Xóa
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
