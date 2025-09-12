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
import { deleteProductHandler } from "@/features/product/handler/mutation/delete";
import { usePageList } from "@/features/product/provider/list";
import { useMutation } from "@tanstack/react-query";

function DeleteDialog() {
  const { deleteSelect, setDeleteSelect, refetch } = usePageList();

  const { mutate } = useMutation({
    mutationFn: deleteProductHandler,
    onSuccess: () => {
      refetch?.();
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
          <DialogTitle>Bạn có chắc xóa sản phẩm?</DialogTitle>
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
            Xóa sản phẩm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
