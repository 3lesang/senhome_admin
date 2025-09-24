import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { OrderDataType } from "@/types/order";
import OrderRow from "./row";

interface OrderTableProps {
	data?: OrderDataType[];
}

export default function OrderTable({ data = [] }: OrderTableProps) {
	return (
		<Table className="bg-white rounded-md overflow-hidden">
			<TableHeader className="bg-gray-50">
				<TableRow className="">
					<TableHead>
						<Checkbox className="ml-8" />
					</TableHead>
					<TableHead>Mã</TableHead>
					<TableHead>Ngày tạo</TableHead>
					<TableHead>Khách hàng</TableHead>
					<TableHead>Thanh toán</TableHead>
					<TableHead>Giao hàng</TableHead>
					<TableHead>Tổng tiền</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item: OrderDataType) => (
					<OrderRow data={item} key={item?.id} />
				))}
			</TableBody>
		</Table>
	);
}
