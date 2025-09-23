import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { OrderDataType } from "@/types/order";
import PageListTableRow from "./row";

interface OrderTableProps {
	data?: OrderDataType[];
}

export default function OrderTable({ data = [] }: OrderTableProps) {
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead>
						<Checkbox className="ml-7" />
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
