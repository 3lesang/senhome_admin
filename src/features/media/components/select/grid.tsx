import { DynamicPagination } from "@/components/dynamic-pagination";
import FileDropzone from "@/components/file-dropzone";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileHandler } from "@/features/media/handler/mutation/create";
import { getListFileQueryOptions } from "@/features/media/handler/query/list";
import type { FileType } from "@/features/media/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Dropzone from "./dropzone";
import FileItem from "./file";

interface SelectModalGridProps {
  onSelect?: (data: FileType) => void;
  onRemove?: (id: string) => void;
  selected?: string[];
}

function SelectModalGrid({
  onRemove,
  onSelect,
  selected,
}: SelectModalGridProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, refetch } = useQuery(
    getListFileQueryOptions({ page, limit, query: "" })
  );
  const { mutate } = useMutation({
    mutationFn: createFileHandler,
    onSuccess: () => {
      refetch?.();
    },
  });

  const handleUpload = (files: File[]) => {
    mutate(files);
  };

  return (
    <div className="max-h-[500px] overflow-y-scroll space-y-8 scrollbar-hide">
      <FileDropzone
        onChange={handleUpload}
        render={({ isDragActive }) => <Dropzone isDragActive={isDragActive} />}
      />
      <div className="grid grid-cols-5 gap-4">
        {data?.items.map((item) => (
          <FileItem
            key={item.id}
            data={item}
            onRemove={onRemove}
            onSelect={onSelect}
            isSelected={selected?.includes(item.id)}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex w-full max-w-sm items-center gap-4">
          <Label htmlFor="limit" className="whitespace-nowrap">
            Số lượng
          </Label>
          <Select
            value={limit.toString()}
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1);
            }}
          >
            <SelectTrigger id="limit" className="bg-white w-[120px]">
              <SelectValue placeholder="Chọn số lượng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <DynamicPagination
            page={page}
            totalItems={data?.totalItems ?? 0}
            perPage={limit}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectModalGrid;
