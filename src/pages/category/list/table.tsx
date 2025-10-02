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
import type { CategoryDataType } from "@/types/category";

interface CategoryTableProps {
	data?: CategoryDataType[];
}

export default function CategoryTable(props: CategoryTableProps) {
	const { data = [] } = props;
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead className="w-16 pl-6">
						<Checkbox />
					</TableHead>
					<TableHead>Tên danh mục</TableHead>
					<TableHead>Ngày tạo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item: CategoryDataType) => (
					<ContextMenu key={item.id}>
						<ContextMenuTrigger asChild>
							<TableRow>
								<TableCell className="pl-6">
									<Checkbox />
								</TableCell>
								<TableCell>{item.name}</TableCell>
								<TableCell>{format(new Date(item.created))}</TableCell>
							</TableRow>
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>
								<EditIcon />
								Chỉnh sửa
							</ContextMenuItem>

							<ContextMenuItem onClick={() => {}}>
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
