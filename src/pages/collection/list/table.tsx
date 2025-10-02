import { Link } from "@tanstack/react-router";
import { EditIcon, Trash2Icon } from "lucide-react";
import { format } from "timeago.js";
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
import type { CollectionType } from "@/types/collection";

interface StorePageTableProps {
	data: CollectionType[];
	onDelete?: (id: string) => void;
}

export default function CollectionTable({
	data,
	onDelete,
}: StorePageTableProps) {
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead className="w-16 pl-6">
						<Checkbox />
					</TableHead>
					<TableHead>Tên</TableHead>
					<TableHead>Ngày tạo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<ContextMenu key={item.id}>
						<ContextMenuTrigger asChild>
							<TableRow>
								<TableCell className="pl-6">
									<Checkbox />
								</TableCell>
								<TableCell>
									<Link
										to="/products/collections/$id"
										params={{ id: item?.id }}
										className="hover:underline"
									>
										{item?.name}
									</Link>
								</TableCell>
								<TableCell>{format(new Date(item?.created))}</TableCell>
							</TableRow>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<Link to="/products/collections/$id" params={{ id: item?.id }}>
								<ContextMenuItem>
									<EditIcon />
									Chỉnh sửa
								</ContextMenuItem>
							</Link>

							<ContextMenuItem onClick={() => onDelete?.(item.id)}>
								<Trash2Icon />
								Xóa
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))}
			</TableBody>
		</Table>
	);
}
