import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderDataType } from "@/features/order/types";
import PageListTableRow from "./row";

interface ListPageTableProps {
  data?: OrderDataType[];
}

function ListPageTable({ data = [] }: ListPageTableProps) {
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Địa chỉ giao hàng</TableHead>
          <TableHead>Tổng đơn hàng</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: OrderDataType) => (
          <PageListTableRow data={item} key={item?.id} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ListPageTable;
