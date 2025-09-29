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
}
export default function MenuRow({ data }: MenuRowProps) {
	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<TableRow>
					<TableCell className="w-8">
						<Checkbox />
					</TableCell>
					<TableCell>
						<Link
							to="/content/menus/$id"
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
				<ContextMenuItem>
					<EditIcon />
					Chỉnh sửa
				</ContextMenuItem>
				<ContextMenuItem>
					<TrashIcon />
					Xóa
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
