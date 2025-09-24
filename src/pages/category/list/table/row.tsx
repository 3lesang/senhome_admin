import { useMutation } from "@tanstack/react-query";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import type { CategoryValuesType } from "@/components/category-form";
import CategoryForm from "@/components/category-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { updateCategoryPocket } from "@/pocketbase/category/update";
import type { CategoryDataType } from "@/types/category";

interface CategoryRowProps {
	data: CategoryDataType;
}

export default function CategoryRow({ data }: CategoryRowProps) {
	const [open, setOpen] = useState(false);

	const { mutate: update } = useMutation({
		mutationFn: (values: CategoryValuesType) =>
			updateCategoryPocket({ id: data.id, name: values.name }),
		onSuccess: () => {
			setOpen(false);
		},
	});

	const handleSubmit = (values: CategoryValuesType) => {
		update(values);
	};

	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell className="w-8">
							<Checkbox />
						</TableCell>
						<TableCell>{data.name}</TableCell>
						<TableCell>{new Date(data.created).toUTCString()}</TableCell>
					</TableRow>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem onClick={() => setOpen(true)}>
						<EditIcon />
						Chỉnh sửa
					</ContextMenuItem>

					<ContextMenuItem onClick={() => {}}>
						<Trash2Icon />
						Xóa
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Cập nhật</DialogTitle>
					</DialogHeader>
					<CategoryForm
						text="Cập nhật"
						defaultValues={{ name: data.name }}
						onSubmit={handleSubmit}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
