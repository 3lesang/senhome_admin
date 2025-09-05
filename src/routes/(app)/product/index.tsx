import { useIsMobile } from "@/hooks/use-mobile";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { InfoIcon, MoreHorizontal, PlusIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

import { DynamicPagination } from "@/components/dynamic-pagination";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";
import { cn, convertToFileUrl, formatVND } from "@/lib/utils";
import type { ProductDataType } from "@/shared/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";
import z from "zod";

export const columns: ColumnDef<ProductDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-10 rounded">
          <AvatarImage src={convertToFileUrl(row.original.expand.thumbnail)} />
        </Avatar>
        <Link
          to="/product/$id"
          params={{ id: row.original.id }}
          className="hover:underline"
        >
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => <p>{formatVND(row.getValue("price"))}</p>,
  },
  {
    accessorKey: "deleted",
    header: "Trạng thái",
    cell: ({ row }) => {
      return row.getValue("deleted") ? (
        <Badge variant="secondary">Chưa đăng</Badge>
      ) : (
        <Badge>Đã đăng</Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Thao tác",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <InfoIcon />
              Chi tiết sản phẩm
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2Icon />
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const productQueryOptions = (
  page: number,
  limit: number,
  filter?: string
) =>
  queryOptions<ListResult<ProductDataType>>({
    queryKey: [PRODUCT_COLLECTION, page, limit, filter],
    queryFn: () =>
      pb.collection(PRODUCT_COLLECTION).getList(page, limit, {
        sort: "-created",
        expand: "thumbnail",
        filter,
      }),
  });

const countProductQueryOptions = () =>
  queryOptions({
    queryKey: ["COUNT_PRODUCT"],
    queryFn: async () => {
      const all = await pb.collection(PRODUCT_COLLECTION).getList(1, 1);
      const publish = await pb.collection(PRODUCT_COLLECTION).getList(1, 1, {
        filter: "deleted=null",
      });
      const unpublish = await pb.collection(PRODUCT_COLLECTION).getList(1, 1, {
        filter: "deleted!=null",
      });
      return {
        totalAll: all.totalItems,
        totalPublish: publish.totalItems,
        totalUnpublish: unpublish.totalItems,
      };
    },
  });

const filterSchema = z.object({
  state: z.enum(["all", "publish", "unpublish"]).optional().catch("all"),
});

type FilterType = z.infer<typeof filterSchema>;

const schema = z.object({
  page: z.number().catch(1).optional(),
  limit: z.number().catch(20).optional(),
  filter: filterSchema.catch({ state: "all" }).optional(),
  sort: z.enum(["newest", "oldest", "price"]).optional(),
});

const buildFilter = (filter?: FilterType) => {
  switch (filter?.state) {
    case "all":
      return "";
    case "publish":
      return "deleted=null";
    case "unpublish":
      return "deleted!=null";
  }
};

export const Route = createFileRoute("/(app)/product/")({
  component: RouteComponent,
  validateSearch: (search) => schema.parse(search),
  beforeLoad: ({ context, search }) => {
    context.queryClient.ensureQueryData(countProductQueryOptions());
    return context.queryClient.ensureQueryData(
      productQueryOptions(
        search?.page ?? 1,
        search.limit ?? 20,
        buildFilter(search?.filter)
      )
    );
  },
});

function RouteComponent() {
  const isMobile = useIsMobile();
  const navigate = Route.useNavigate();
  const { page = 1, limit = 20, filter = { state: "all" } } = Route.useSearch();

  const { data } = useSuspenseQuery(
    productQueryOptions(page, limit, buildFilter(filter))
  );

  const { data: dataCountProducts } = useSuspenseQuery(
    countProductQueryOptions()
  );

  const PRODUCT_FILTER = [
    {
      name: "Tất cả",
      state: "all" as "all",
      count: dataCountProducts?.totalAll,
    },
    {
      name: "Đang hoạt động",
      state: "publish" as "publish",
      count: dataCountProducts?.totalPublish,
    },
    {
      name: "Chưa được đăng",
      state: "unpublish" as "unpublish",
      count: dataCountProducts?.totalUnpublish,
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: data.items ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isMobile) {
    return (
      <div>
        <h1 className="text-xl p-2">Product</h1>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-32 mx-auto space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/product">Sản phẩm</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Sản phẩm</h3>
        <div>
          <Link to="/product/create" className={cn(buttonVariants())}>
            Thêm 1 sản phẩm mới
            <PlusIcon />
          </Link>
        </div>
      </div>
      <div className="flex">
        {PRODUCT_FILTER?.map((item) => (
          <Button
            variant={filter?.state == item.state ? "secondary" : "ghost"}
            onClick={() => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  filter: { ...prev.filter, state: item.state },
                }),
              });
            }}
            className="space-x-1 shadow-none"
          >
            <span>{item.name}</span>
            <span>{item.count}</span>
          </Button>
        ))}
      </div>
      <div className="flex justify-between">
        <div>
          <Badge variant="secondary">{data?.totalItems} sản phẩm</Badge>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có sản phẩm.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2">
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
