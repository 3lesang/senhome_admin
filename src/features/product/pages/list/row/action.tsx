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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProductHandler } from "@/features/product/handler/mutate/delete-product-handler";
import { usePageList } from "@/features/product/provider/list";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EditIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface RowActionProps {
  id?: string;
}

function RowAction({ id }: RowActionProps) {
  const [open, setOpen] = useState(false);
  const { refetch } = usePageList();

  const { mutate } = useMutation({
    mutationFn: deleteProductHandler,
    onSuccess: () => {
      refetch?.();
      setOpen(false);
    },
  });

  const handleDelete = () => {
    id && mutate([id]);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 size-6 transition-opacity duration-150"
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to="/product/$id" params={{ id: id as string }}>
              <EditIcon />
              Chỉnh sửa
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2Icon />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
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
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button onClick={handleDelete}>Xóa sản phẩm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RowAction;
