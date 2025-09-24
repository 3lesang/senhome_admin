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
import { convertToFileUrl } from "@/lib/utils";
import type { ProductDataType } from "@/types/product";

interface ProductRowProps {
	data: ProductDataType;
}

export default function ProductRow({ data }: ProductRowProps) {
	const { id } = data;

	const state = data?.deleted ? "draft" : "publish";

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<TableRow>
					<TableCell>
						<Checkbox />
					</TableCell>
					<TableCell>
						<div className="flex items-center gap-2">
							<Avatar className="rounded size-6">
								<AvatarImage src={convertToFileUrl(data.expand.thumbnail)} />
								<AvatarFallback className="rounded"></AvatarFallback>
							</Avatar>
							<Link
								to="/products/$id"
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
				</TableRow>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem asChild>
					<Link
						to="/products/$id"
						params={{ id }}
						className="flex items-center gap-2"
					>
						<EditIcon />
						Chỉnh sửa
					</Link>
				</ContextMenuItem>
				<ContextMenuItem onClick={() => {}}>
					<Trash2Icon />
					Xóa
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
