import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProductHandler } from "@/handlers/product/mutation/delete";
import { useCategoryList } from "@/stores/category";

export default function DeleteAction() {
	const { selected, setSelected, refetch } = useCategoryList();

	const keys = Object.keys(selected ?? {}).filter((key) => selected?.[key]);

	const { mutate } = useMutation({
		mutationFn: deleteProductHandler,
		onSuccess: () => {
			refetch?.();
			setSelected?.({});
		},
	});

	const handleDelete = () => {
		mutate(keys);
	};

	if (Number(keys.length) === 0) return null;

	return (
		<div className="flex items-center gap-1">
			<Button variant="ghost" onClick={() => setSelected?.({})}>
				Hủy
			</Button>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">
						<Trash2Icon />
						<span>{keys.length}</span>
						Xóa
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Bạn có chắc xóa {keys.length} sản phẩm?</DialogTitle>
						<DialogDescription>
							Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn dữ
							liệu
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Hủy</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button onClick={handleDelete}>Xóa {keys.length} sản phẩm</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
