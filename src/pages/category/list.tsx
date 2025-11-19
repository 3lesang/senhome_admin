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
import { getCategoriesQueryOptions } from "@/queries/category";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function CategoryListPage() {
  const { page, limit } = useSearch({ from: "/(app)/categories/" });
  const [pagination, setPagination] = useState({
    page,
    limit,
  });

  const getCategoriesQuery = useSuspenseQuery(
    getCategoriesQueryOptions(pagination),
  );

  return (
    <Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Quản lý danh mục</CardTitle>
        <CardDescription>Danh sách danh mục sản phẩm</CardDescription>
        <CardAction>
          <Link to="/categories/create" className={cn(buttonVariants())}>
            Tạo danh mục
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>
              <TabsButton
                tabs={[{ label: "Tất cả danh mục", value: "" }]}
                value=""
              />
            </CardTitle>
            <CardDescription>
              <Badge variant="secondary">
                {getCategoriesQuery.data.data.total_items} danh mục
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
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Đường dẫn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCategoriesQuery.data.data.data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow>
                      <TableCell className="pl-6">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/categories/$id"
                          params={{ id: item.id.toString() }}
                          className="hover:underline"
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell>{item.slug}</TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <EditIcon />
                      Chỉnh sửa
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => {}}>
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
              total={getCategoriesQuery.data.data.total_items}
              page={pagination.page}
              limit={pagination.limit}
              onChange={setPagination}
            />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
