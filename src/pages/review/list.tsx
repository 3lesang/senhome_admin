import axiosClient from "@/axios";
import TablePagination, {
  type TablePaginationDataChange,
} from "@/components/table/pagination";
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
import { getReviewsByProductQueryOptions } from "@/queries/review";
import { s3Client } from "@/s3";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon, StarIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export function ReviewListPage() {
  const { page, limit } = useSearch({ from: "/(app)/products/$id/reviews/" });
  const [params, setParams] = useState({
    page,
    limit,
  });
  const { id } = useParams({ from: "/(app)/products/$id/reviews/" });

  const getReviewsQuery = useSuspenseQuery(
    getReviewsByProductQueryOptions({ page, limit, productId: id }),
  );

  const deleteReviewsMutation = useMutation({
    mutationFn: (value: { ids: number[]; files: string[] }) => {
      s3Client.send(
        new DeleteObjectsCommand({
          Bucket: "r2-bucket",
          Delete: {
            Objects: value.files.map((f) => ({ Key: f })),
          },
        }),
      );
      return axiosClient.delete("/reviews", { data: { ids: value.ids } });
    },
    onSuccess: () => {
      getReviewsQuery.refetch();
    },
  });

  const handlePaginationChange = (value: TablePaginationDataChange) => {
    setParams(value);
  };

  return (
    <Card className="border-0 shadow-none max-w-6xl mx-auto bg-transparent">
      <CardHeader>
        <CardTitle>Quản lý đánh giá</CardTitle>
        <CardDescription>Danh sách đánh giá</CardDescription>
        <CardAction>
          <Link
            to="/products/$id/reviews/create"
            params={{ id }}
            type="button"
            className={cn(buttonVariants())}
          >
            Thêm đánh giá
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
                {getReviewsQuery.data.data.total_items} đánh giá
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
                <TableHead>Đánh giá</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Khách hàng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getReviewsQuery.data.data.data?.map((item) => (
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow>
                      <TableCell className="w-16 text-center">
                        <Checkbox />
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.rating}
                          <StarIcon className="fill-primary" />
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <p className="line-clamp-1">{item.comment}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          <Link
                            to="/customers/$id"
                            params={{ id: item.customer.id.toString() }}
                          >
                            {item.customer.name}
                          </Link>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() =>
                        deleteReviewsMutation.mutateAsync({
                          ids: [item.id],
                          files: item.files,
                        })
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
              total={getReviewsQuery.data.data.total_items}
              onChange={handlePaginationChange}
            />
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
