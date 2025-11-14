import axiosClient from "@/axios";
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
import { getMenusQueryOptions } from "@/queries/menu";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function MenuListPage() {
  const { page, limit, query } = useSearch({ from: "/(app)/store/menu/" });
  const [pagination, setPagination] = useState({
    page,
    limit,
  });

  const getMenusQuery = useSuspenseQuery(
    getMenusQueryOptions({ page, limit, query: query }),
  );

  const deleteMenuMutation = useMutation({
    mutationFn: (ids: number[]) => {
      return axiosClient.delete("/menus", { data: { ids } });
    },
    onSuccess: () => {
      getMenusQuery.refetch();
    },
  });

  return (
    <Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Menu</CardTitle>
        <CardDescription>
          Menu hoặc danh sách liên kết website , giúp khách hàng chuyển trang
          trong cửa hàng của bạn. Bạn có thể tạo các menu lồng nhau.
        </CardDescription>
        <CardAction>
          <Link to="/store/menu/create" className={cn(buttonVariants())}>
            Tạo menu
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Card className="shadow-none border-0">
          <CardHeader>
            <CardTitle>
              <TabsButton tabs={[{ label: "Tất cả", value: "" }]} value="" />
            </CardTitle>
            <CardDescription>
              <Badge variant="secondary">
                {getMenusQuery.data.data.total_items} menu
              </Badge>
            </CardDescription>
            <CardAction className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <SearchIcon />
              </Button>
              <Button variant="outline" size="icon">
                <ListFilterIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <Table>
            <TableHeader className="bg-sidebar">
              <TableRow>
                <TableHead className="w-16 pl-6">
                  <Checkbox />
                </TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Vị trí</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getMenusQuery.data.data.data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow>
                      <TableCell className="pl-6">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/store/menu/$id"
                          params={{ id: item.id.toString() }}
                          className="hover:underline"
                        >
                          {item?.name}
                        </Link>
                      </TableCell>
                      <TableCell>{item?.position}</TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <Link
                      to="/store/menu/$id"
                      params={{ id: item.id.toString() }}
                    >
                      <ContextMenuItem>
                        <EditIcon />
                        Chỉnh sửa
                      </ContextMenuItem>
                    </Link>
                    <ContextMenuItem
                      onClick={() => deleteMenuMutation.mutateAsync([item.id])}
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
              total={getMenusQuery.data.data.total_items}
              onChange={setPagination}
            />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
