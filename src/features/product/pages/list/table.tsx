import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductDataType } from "@/features/product/types";
import PageListTableRow from "./row";

interface ListPageTableProps {
  data?: ProductDataType[];
}

function ListPageTable({ data = [] }: ListPageTableProps) {
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Tên sản phẩm</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Danh mục</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: ProductDataType) => (
          <PageListTableRow key={item?.id} data={item} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ListPageTable;
