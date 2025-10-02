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
import type { StorePageType } from "@/types/store";

interface StorePageTableProps {
	data?: StorePageType[];
	onDelete?: (id: string) => void;
}

export default function StorePageTable({
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
					<TableHead>Tên chính sách</TableHead>
					<TableHead>Ngày tạo</TableHead>
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
										to="/store/pages/$id"
										params={{ id: item?.id }}
										className="hover:underline"
									>
										{item?.title}
									</Link>
								</TableCell>
								<TableCell>{format(new Date(item?.created))}</TableCell>
							</TableRow>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<Link to="/store/pages/$id" params={{ id: item?.id }}>
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
