import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EditIcon, Trash2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatRelativeDate } from "@/lib/utils";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";
import { deleteStorePagePocket } from "@/pocketbase/store/page/delete";
import { queryClient } from "@/queryClient";
import type { StorePageType } from "@/types/store";

interface StorePageRowProps {
	data?: StorePageType;
}

export default function StorePageRow({ data }: StorePageRowProps) {
	const { id, title, created } = data ?? {
		id: "",
		title: "",
		created: "",
		slug: "",
	};

	const { mutate: deleteMutate } = useMutation({
		mutationFn: (ids: string[]) => deleteStorePagePocket(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [STORE_PAGE_COLLECTION],
			});
		},
	});

	const handleDelete = () => {
		deleteMutate([id]);
	};

	return (
		<ContextMenu key={id}>
			<ContextMenuTrigger asChild>
				<TableRow key={id}>
					<TableCell className="w-8">
						<Checkbox />
					</TableCell>
					<TableCell>
						<Link
							to="/store/pages/$id"
							params={{ id }}
							className="hover:underline"
						>
							{title}
						</Link>
					</TableCell>
					<TableCell>{formatRelativeDate(new Date(created))}</TableCell>
				</TableRow>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<Link to="/store/pages/$id" params={{ id }}>
					<ContextMenuItem>
						<EditIcon />
						Chỉnh sửa
					</ContextMenuItem>
				</Link>

				<ContextMenuItem onClick={handleDelete}>
					<Trash2Icon />
					Xóa
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
