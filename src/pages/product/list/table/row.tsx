import type { CheckedState } from "@radix-ui/react-checkbox";
import { Link } from "@tanstack/react-router";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { PRODUCT_STATE } from "@/constants/product";
import { cn, convertToFileUrl } from "@/lib/utils";
import { useProductList } from "@/stores/product";
import type { ProductDataType } from "@/types/product";

interface PageListTableRowProps {
	data: ProductDataType;
	categoryMap?: Record<string, { id: string; name: string }>;
}

export default function PageListTableRow({
	data,
	categoryMap,
}: PageListTableRowProps) {
	const { id } = data;
	const { selected, setSelected, setDeleteSelect } = useProductList();

	const handleSelect = (checked: CheckedState) => {
		setSelected?.((prev) => ({ ...prev, [data.id]: checked as boolean }));
	};

	const checked = Boolean(selected?.[data.id]);
	const state = data?.deleted ? "draft" : "publish";

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<TableRow className={cn(checked ? "bg-gray-50" : "")}>
					<TableCell>
						<Checkbox checked={checked} onCheckedChange={handleSelect} />
					</TableCell>
					<TableCell>
						<div className="flex items-center gap-2">
							<Avatar className="rounded size-6">
								<AvatarImage src={convertToFileUrl(data.expand.thumbnail)} />
								<AvatarFallback className="rounded"></AvatarFallback>
							</Avatar>
							<Link
								to="/product/$id"
								params={{ id: data.id }}
								className="hover:underline"
							>
								{data.name}
							</Link>
						</div>
					</TableCell>
					<TableCell>
						<Badge variant={state === "draft" ? "secondary" : "default"}>
							{PRODUCT_STATE[state].text}
						</Badge>
					</TableCell>
					<TableCell>{categoryMap?.[data.category]?.name}</TableCell>
				</TableRow>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem asChild>
					<Link
						to="/product/$id"
						params={{ id }}
						className="flex items-center gap-2"
					>
						<EditIcon />
						Chỉnh sửa
					</Link>
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => {
						setDeleteSelect?.(id);
					}}
				>
					<Trash2Icon />
					Xóa
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
