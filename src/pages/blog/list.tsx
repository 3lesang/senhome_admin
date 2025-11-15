import axiosClient from "@/axios";
import type { TablePaginationDataChange } from "@/components/table/pagination";
import TablePagination from "@/components/table/pagination";
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
import { getPostsQueryOptions } from "@/queries/post";
import { s3Client } from "@/s3";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function BlogListPage() {
  const { page, limit } = useSearch({ from: "/(app)/content/blog/" });
  const [pagination, setPagination] = useState({
    page,
    limit,
  });

  const getPostsQuery = useSuspenseQuery(getPostsQueryOptions({ page, limit }));

  const deletePageMutaion = useMutation({
    mutationFn: (ids: number[]) => {
      const keys = ids.flatMap((id) => [
        { Key: `post/content/${id}` },
        { Key: `post/file/${id}` },
      ]);
      s3Client.send(
        new DeleteObjectsCommand({
          Bucket: "r2-bucket",
          Delete: {
            Objects: keys,
          },
        }),
      );
      return axiosClient.delete("/posts", { data: { ids } });
    },
    onSuccess: () => {
      getPostsQuery.refetch();
    },
  });

  const handlePaginationChange = (value: TablePaginationDataChange) => {
    setPagination(value);
  };

  return (
    <Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Quản lý bài viết</CardTitle>
        <CardDescription>
          Các bài viết của bạn, quản lý và tạo bài viết mới.
        </CardDescription>
        <CardAction>
          <Link to="/content/blog/create" className={cn(buttonVariants())}>
            Tạo bài viết
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
                {getPostsQuery.data.data.total_items} bài viết
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
                <TableHead className="w-8"></TableHead>
                <TableHead>Tiêu đề</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getPostsQuery.data.data.data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow>
                      <TableCell className="pl-6">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="w-8">
                        <Avatar className="rounded bg-neutral-100">
                          <AvatarImage
                            className="object-contain"
                            src={`https://bucket.senhome.vn/post/file/${item.id}`}
                          />
                          <AvatarFallback className="rounded">B</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Link
                          to="/content/blog/$id"
                          params={{ id: item?.id.toString() }}
                          className="hover:underline"
                        >
                          {item?.title}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <Link
                      to="/content/blog/$id"
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
              total={getPostsQuery.data.data.total_items}
              onChange={handlePaginationChange}
            />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
