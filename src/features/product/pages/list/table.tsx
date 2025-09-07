import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductDataType } from "@/shared/types";
import PageListTableRow from "./row";

interface ListPageTableProps {
  data?: ProductDataType[];
}

function ListPageTable({ data = [] }: ListPageTableProps) {
  return (
    <Table className="bg-white rounded-md overflow-hidden">
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead>
            <Checkbox className="ml-7" />
          </TableHead>
          <TableHead>Tên sản phẩm</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Danh mục</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item: ProductDataType) => (
          <PageListTableRow data={item} key={item?.id} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ListPageTable;
