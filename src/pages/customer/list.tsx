import axiosClient from "@/axios";
import TablePagination, {
  type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getCustomersQueryOptions } from "@/queries/customer";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function CustomerListPage() {
  const { page, limit } = useSearch({ from: "/(app)/customers/" });
  const [params, setParams] = useState({
    page,
    limit,
  });

  const getCustomerQuery = useSuspenseQuery(getCustomersQueryOptions(params));
  const deleteCustomerMutation = useMutation({
    mutationFn: (ids: number[]) => {
      return axiosClient.delete("/customers", { data: { ids } });
    },
    onSuccess: () => {
      getCustomerQuery.refetch();
    },
  });

  function handlePaginationChange(data: TablePaginationDataChange) {
    setParams(data);
  }

  return (
    <Card className="border-0 shadow-none max-w-6xl mx-auto bg-transparent">
      <CardHeader>
        <CardTitle>Quản lý khách hàng</CardTitle>
        <CardDescription>Danh sách khách hàng</CardDescription>
        <CardAction>
          <Link
            to="/customers/create"
            type="button"
            className={cn(buttonVariants())}
          >
            Thêm khách hàng
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
                {getCustomerQuery.data.data.total_items} khách hàng
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
          <Table>
            <TableHeader className="bg-sidebar">
              <TableRow>
                <TableHead className="w-16 text-center">
                  <Checkbox />
                </TableHead>
                <TableHead></TableHead>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCustomerQuery.data.data.data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow>
                      <TableCell className="w-16 text-center">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="w-8">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() =>
                        deleteCustomerMutation.mutateAsync([item.id])
                      }
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
              page={params.page}
              limit={params.limit}
              total={getCustomerQuery.data.data.total_items}
              onChange={handlePaginationChange}
            />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
