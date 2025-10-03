import { Link } from "@tanstack/react-router";
import { EditIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { MenuType } from "@/types/menu";

interface MenuTableProps {
	data: MenuType[];
	onDelete?: (id: string) => void;
}

export default function MenuTable({ data, onDelete }: MenuTableProps) {
	return (
		<Table>
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead className="w-16 pl-6">
						<Checkbox />
					</TableHead>
					<TableHead>Tên</TableHead>
					<TableHead>Vị trí</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item) => (
					<ContextMenu key={item.id}>
						<ContextMenuTrigger asChild>
							<TableRow>
								<TableCell className="pl-6">
									<Checkbox />
								</TableCell>
								<TableCell>
									<Link
										to="/store/menus/$id"
										params={{ id: item.id }}
										className="hover:underline"
									>
										{item?.name}
									</Link>
								</TableCell>
								<TableCell>{item?.position}</TableCell>
							</TableRow>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<Link to="/store/menus/$id" params={{ id: item.id }}>
								<ContextMenuItem>
									<EditIcon />
									Chỉnh sửa
								</ContextMenuItem>
							</Link>
							<ContextMenuItem onClick={() => onDelete?.(item.id)}>
								<TrashIcon />
								Xóa
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))}
			</TableBody>
		</Table>
	);
}
