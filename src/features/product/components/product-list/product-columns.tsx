import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InfoIcon, MoreHorizontal, Trash2Icon } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { convertToFileUrl, formatVND } from "@/lib/utils";
import type { ProductDataType } from "@/shared/types";

export const ProductColumns: ColumnDef<ProductDataType>[] = [
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
