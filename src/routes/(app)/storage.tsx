import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SquareCheckIcon, TrashIcon, UploadIcon } from "lucide-react";

import { DynamicPagination } from "@/components/dynamic-pagination";
import type { FileType } from "@/components/media/schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILE_COLLECTION, pb } from "@/lib/pocketbase";
import { cn, convertToFileUrl } from "@/lib/utils";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";
import { useEffect, useState } from "react";
import z from "zod";

const schema = z.object({
  page: z.number().catch(1).optional(),
  limit: z.number().catch(20).optional(),
});

export const mediaQueryOptions = (page: number, limit: number) =>
  queryOptions<ListResult<FileType>>({
    queryKey: [FILE_COLLECTION, page, limit],
    queryFn: () =>
      pb.collection(FILE_COLLECTION).getList(page, limit, {
        expand: "image",
        sort: "-created",
      }),
  });

export const Route = createFileRoute("/(app)/storage")({
  component: RouteComponent,
  validateSearch: (search) => schema.parse(search),
});

function CheckOverplay({
  onChange,
  display,
  value = false,
}: {
  onChange?: (value: boolean) => void;
  display?: boolean;
  value: boolean;
}) {
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    onChange?.(checked);
  }, [checked]);

  if (!display) return null;
  return (
    <div
      className={cn(
        "absolute inset-0 p-2 cursor-pointer",
        checked ? "bg-black/30" : "bg-black/10"
      )}
      onClick={() => setChecked(!checked)}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
    </div>
  );
}

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { page = 1, limit = 20 } = Route.useSearch();

  const [isSelect, setIsSelect] = useState(false);
  const [selected, setSelected] = useState(() => new Set<string>());

  const addItem = (item: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.add(item);
      return newSet;
    });
  };

  const removeItem = (item: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.delete(item);
      return newSet;
    });
  };

  const { data } = useSuspenseQuery(mediaQueryOptions(page, limit));

  return (
    <div className="w-full p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/storage">Lưu trữ</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mt-4">
        <h3 className="font-bold text-2xl">Lưu trữ</h3>
        <div className="flex gap-2">
          <Button>
            Upload
            <UploadIcon />
          </Button>
        </div>
      </div>
      <div className="flex mt-4">
        <Button
          variant={isSelect ? "secondary" : "ghost"}
          onClick={() => setIsSelect(!isSelect)}
        >
          Lựa chọn
          <SquareCheckIcon />
        </Button>
        {isSelect && selected.size > 0 && (
          <Button variant="destructive">
            <TrashIcon />
            Xóa
          </Button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-1 mt-4">
        {data?.items?.map((item) => (
          <div className="col-span-2">
            <div className="flex justify-center items-center relative h-full aspect-square rounded overflow-hidden">
              <img
                src={convertToFileUrl(item)}
                alt=""
                className="w-full object-cover select-none"
              />
              <CheckOverplay
                display={isSelect}
                value={selected.has(item.id)}
                onChange={(checked) => {
                  const isExit = selected.has(item.id);
                  if (checked) {
                    if (!isExit) {
                      addItem(item.id);
                    }
                  } else {
                    if (isExit) {
                      removeItem(item.id);
                    }
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-2">
          <Label>Số lượng</Label>
          <Select
            defaultValue={limit.toString()}
            onValueChange={(value) =>
              navigate({
                search: (prev) => ({ ...prev, limit: Number(value) }),
              })
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <DynamicPagination
            page={page}
            totalItems={data?.totalItems ?? 0}
            perPage={limit}
            onPageChange={(page) =>
              navigate({ search: (prev) => ({ ...prev, page }) })
            }
          />
        </div>
      </div>
    </div>
  );
}
