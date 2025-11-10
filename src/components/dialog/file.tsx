import { useInfiniteQuery } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { getFilesInfinityQueryOptions } from "@/queries/file";

interface FileDialogProps {
  value: string[];
  onConfirm?: (data: string[]) => void;
  multiple?: boolean;
  children: ReactNode;
}

export function FileDialog({
  value,
  onConfirm,
  multiple,
  children,
}: FileDialogProps) {
  const [files, setFiles] = useState<string[]>(value ?? []);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(getFilesInfinityQueryOptions());

  function handleChange(checked: boolean, value: string) {
    if (checked) {
      setFiles((prev) => {
        if (multiple) return [...prev, value];
        return [value];
      });
    } else {
      setFiles((prev) => {
        if (multiple) return prev.filter((f) => f !== value);
        return [];
      });
    }
  }

  function handleConfirm() {
    onConfirm?.(files);
  }

  useEffect(() => {
    setFiles(value);
  }, [value]);

  useEffect(() => {
    if (isIntersecting && !isFetchingNextPage) fetchNextPage();
  }, [isIntersecting, isFetchingNextPage, fetchNextPage]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn tệp</DialogTitle>
        </DialogHeader>

        <div className="max-h-96 overflow-scroll">
          <div className="grid grid-cols-5 gap-1 min-h-96">
            {data?.pages.map((page) =>
              page.data?.map((item) => {
                return (
                  <FileItem
                    key={item.id}
                    value={item.name}
                    onChange={handleChange}
                    checked={files.includes(item.name ?? "")}
                  />
                );
              }),
            )}
          </div>
          {hasNextPage && (
            <div ref={ref} className="flex justify-center items-center h-16">
              {isFetchingNextPage && <Spinner />}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Hủy
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleConfirm}>
              Xác nhận
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FileItemProps {
  value?: string;
  onChange?: (checked: boolean, value: string) => void;
  checked?: boolean;
}

const FileItem = ({ value, onChange, checked }: FileItemProps) => {
  function handleChange(checked: boolean) {
    value && onChange?.(checked, value);
  }
  return (
    <Label className="aspect-square bg-neutral-50 relative rounded-md overflow-hidden border cursor-pointer">
      <img
        src={`https://bucket.senhome.vn/${value}`}
        alt=""
        className="object-contain h-full w-full"
      />
      <Checkbox
        defaultChecked={checked}
        className="absolute top-1 right-1 bg-white"
        onCheckedChange={handleChange}
      />
    </Label>
  );
};
