import axiosClient from "@/axios";
import type { TablePaginationDataChange } from "@/components/table/pagination";
import TablePagination from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getDiscountsQueryOptions } from "@/queries/discount";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

function getDiscountStatus(status: string) {
  const STATUS: Record<string, string> = {
    draft: "Bản nháp",
    active: "Hoạt động",
    scheduled: "Theo lịch trình",
    expired: "Hết hạn",
  };
  return STATUS[status];
}

function getDiscountType(type: string) {
  const TYPE: Record<string, string> = {
    code: "Mã giảm giá",
    automatic: "Tự động",
  };
  return TYPE[type];
}

export function DiscountListPage() {
  const { page, limit } = useSearch({ from: "/(app)/discounts/" });
  const [pagination, setPagination] = useState({
    page,
    limit,
  });
  const getDiscountsQuery = useSuspenseQuery(
    getDiscountsQueryOptions({ page, limit }),
  );

  const deletePageMutaion = useMutation({
    mutationFn: (ids: number[]) => {
      return axiosClient.delete("/discounts", { data: { ids } });
    },
    onSuccess: () => {
      getDiscountsQuery.refetch();
    },
  });

  const handlePaginationChange = (value: TablePaginationDataChange) => {
    setPagination(value);
  };

  return (
    <Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Khuyến mãi</CardTitle>
        <CardDescription>
          Các khuyến mãi nội dung của bạn, quản lý và tạo khuyến mãi mới.
        </CardDescription>
        <CardAction>
          <Link to="/discounts/create" className={cn(buttonVariants())}>
            Tạo khuyến mãi
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>
              <TabsButton tabs={[{ label: "Tất cả", value: "" }]} value="" />
            </CardTitle>
            <CardDescription>
              <Badge variant="secondary">
                {getDiscountsQuery.data.data.total_items} khuyến mãi
              </Badge>
            </CardDescription>
            <CardAction className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <SearchIcon />
              </Button>
              <Button variant="outline" size="icon">
                <ListFilterIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <Table className="bg-white rounded-md">
            <TableHeader className="bg-sidebar">
              <TableRow>
                <TableHead className="w-16 pl-6">
                  <Checkbox />
                </TableHead>
                <TableHead>Mã & Tiêu đề</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Loại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getDiscountsQuery.data.data.data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow>
                      <TableCell className="pl-6">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/discounts/$id"
                          params={{ id: item?.id.toString() }}
                          className="hover:underline"
                        >
                          {item.title || item?.code}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getDiscountStatus(item.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getDiscountType(item.discount_type)}
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <Link
                      to="/discounts/$id"
                      params={{ id: item?.id.toString() }}
                    >
                      <ContextMenuItem>
                        <EditIcon />
                        Chỉnh sửa
                      </ContextMenuItem>
                    </Link>
                    <ContextMenuItem
                      onClick={() => deletePageMutaion.mutateAsync([item.id])}
                    >
                      <Trash2Icon />
                      Xóa
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </TableBody>
          </Table>
          <CardFooter>
            <TablePagination
              page={pagination.page}
              limit={pagination.limit}
              total={getDiscountsQuery.data.data.total_items}
              onChange={handlePaginationChange}
            />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
