import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { deleteCategoryPocket } from "@/pocketbase/category/delete";
import { useCategoryList } from "@/stores/category";

export default function DeleteDialog() {
	const { deleteSelect, setDeleteSelect, refetch } = useCategoryList();

	const { mutate } = useMutation({
		mutationFn: deleteCategoryPocket,
		onSuccess: () => {
			refetch?.();
			setDeleteSelect("");
		},
	});

	const handleDelete = () => {
		deleteSelect && mutate([deleteSelect]);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) setDeleteSelect?.("");
	};

	return (
		<Dialog open={!!deleteSelect} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Bạn có chắc xóa danh mục?</DialogTitle>
					<DialogDescription>
						Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn dữ
						liệu
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Hủy
						</Button>
					</DialogClose>
					<Button type="button" onClick={handleDelete}>
						Xóa danh mục
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
