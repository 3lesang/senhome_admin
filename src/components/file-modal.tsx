import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FILE_GRAPH_COLLECTION, pb } from "@/lib/pocketbase";
import { convertToFileUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DynamicPagination } from "./dynamic-pagination";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export interface FileMap {
  id: string;
  url: string;
}

interface FileModalProps {
  open: boolean;
  mode?: "single" | "multiple";
  onOpenChange: (open: boolean) => void;
  onConfirm?: (files: Map<string, FileMap>) => void;
}

function FileModal({
  open,
  mode = "multiple",
  onOpenChange,
  onConfirm,
}: FileModalProps) {
  const [files, setFiles] = useState(new Map<string, FileMap>());
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: [FILE_GRAPH_COLLECTION, page],
    queryFn: () =>
      pb.collection(FILE_GRAPH_COLLECTION).getList(page, 18, {
        sort: "-created",
        expand: "file",
      }),
  });

  const addFile = (key: string, file: FileMap) => {
    setFiles((prev) => {
      if (mode == "multiple") {
        const newMap = new Map(prev);
        newMap.set(key, file);
        return newMap;
      } else {
        const newMap = new Map();
        newMap.set(key, file);
        return newMap;
      }
    });
  };

  const removeFile = (key: string) => {
    setFiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  const handleConfirm = () => {
    onConfirm?.(files);
  };

  useEffect(() => {
    setFiles(new Map());
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl">
        <DialogHeader className="">
          <DialogTitle>Thư viện</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex justify-between">
            <div>
              {files.size > 0 && (
                <Badge variant="secondary">Đã chọn {files.size}</Badge>
              )}
            </div>
            <Button variant="ghost">
              <span>Upload</span>
              <UploadIcon />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-6 gap-1">
          {data?.items?.map((item) => (
            <div className="relative" key={item?.id}>
              <img
                src={convertToFileUrl(item.expand?.file)}
                alt=""
                className="object-contain aspect-square"
              ></img>
              <Checkbox
                checked={files.has(item.expand?.file?.id)}
                className="absolute right-2 top-2"
                onCheckedChange={(checked) => {
                  if (checked) {
                    addFile(item.expand?.file?.id, {
                      id: item.expand?.file?.id,
                      url: convertToFileUrl(item.expand?.file) ?? "/",
                    });
                  } else {
                    removeFile(item.expand?.file?.id);
                  }
                }}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="w-full text-right">
            <div className="flex justify-center w-full mb-4">
              {Number(data?.totalItems) > 20 && (
                <DynamicPagination
                  page={page}
                  totalItems={Number(data?.totalItems)}
                  perPage={18}
                  onPageChange={(page) => setPage(page)}
                />
              )}
            </div>
            <Button onClick={handleConfirm}>
              Chọn {files.size > 0 && files.size} hình
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FileModal;
