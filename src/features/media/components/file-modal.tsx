import { DynamicPagination } from "@/components/dynamic-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FileType } from "@/features/media/types";
import pocketClient from "@/lib/pocketbase";
import { convertToFileUrl } from "@/lib/utils";
import { FILE_COLLECTION } from "@/shared/constants/pocketbase";
import { useQuery } from "@tanstack/react-query";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FileModalProps {
  open: boolean;
  value?: FileType[];
  mode?: "single" | "multiple";
  onOpenChange: (open: boolean) => void;
  onConfirm?: (files: FileType[]) => void;
}

function FileModal({
  value,
  open,
  mode = "multiple",
  onOpenChange,
  onConfirm,
}: FileModalProps) {
  const [page, setPage] = useState(1);
  const [files, setFiles] = useState<FileType[]>(value ?? []);

  const { data } = useQuery({
    queryKey: [FILE_COLLECTION, page],
    queryFn: () =>
      pocketClient.collection(FILE_COLLECTION).getList(page, 18, {
        sort: "-created",
      }),
  });

  const addFile = (file: FileType) => {
    setFiles((prev) => {
      if (mode === "multiple") {
        if (prev.find((f) => f.id === file.id)) return prev;
        return [...prev, file];
      } else {
        return [file];
      }
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleConfirm = () => {
    onConfirm?.(files);
  };

  useEffect(() => {
    setFiles(value ?? []);
  }, [value?.length]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl">
        <DialogHeader>
          <DialogTitle>Thư viện</DialogTitle>
          <DialogDescription />
          <div className="flex justify-between">
            <div>
              {files.length > 0 && (
                <Badge variant="secondary">Đã chọn {files.length}</Badge>
              )}
            </div>
            <Button variant="ghost" type="button">
              <span>Upload</span>
              <UploadIcon />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-6 gap-1">
          {data?.items?.map((item) => {
            const isSelected = files.some((f) => f.id === item.id);
            return (
              <div className="relative" key={item.id}>
                <img
                  src={convertToFileUrl(item)}
                  alt=""
                  className="object-contain aspect-square"
                />
                <Checkbox
                  type="button"
                  checked={isSelected}
                  className="absolute right-2 top-2"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addFile({
                        id: item.id,
                        url: convertToFileUrl(item) ?? "/",
                      });
                    } else {
                      removeFile(item.id);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <div className="w-full text-right">
            <div className="flex justify-center w-full mb-4">
              {Number(data?.totalItems) > 20 && (
                <DynamicPagination
                  page={page}
                  totalItems={Number(data?.totalItems)}
                  perPage={18}
                  onPageChange={setPage}
                />
              )}
            </div>
            <Button type="button" onClick={handleConfirm}>
              Chọn {files.length > 0 && files.length} hình
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FileModal;
