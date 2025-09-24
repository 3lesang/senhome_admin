import { ListFilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table-pagination";
import TableTabs, { type TableTableDataType } from "@/components/table-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useOrderList } from "@/stores/order";
import OrderTable from "./table";

const tabs: TableTableDataType[] = [
	{ label: "Tất cả đơn hàng", q: "" },
	{ label: "Đơn hàng mới", q: `status="created"` },
	{ label: "Chưa giao hàng", q: `status="completed"` },
	{ label: "Chưa thanh toán", q: `status="canceled"` },
];

function OrderContent() {
	const { data, page, limit, setPage, setLimit, setQuery } = useOrderList();

	const handleChange = ({ limit, page }: TablePaginationDataChange) => {
		setPage(page);
		setLimit(limit);
	};

	return (
		<Card className="border-0 shadow-none bg-sidebar">
			<CardHeader>
				<CardTitle>
					<TableTabs data={tabs} onChange={setQuery} />
				</CardTitle>
				<CardDescription>
					<Badge variant="secondary">{data.totalItems} đơn hàng</Badge>
				</CardDescription>
				<CardAction className="flex items-center gap-2">
					<Button size="icon" variant="outline">
						<SearchIcon />
					</Button>
					<Button variant="outline" size="icon">
						<ListFilterIcon />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<OrderTable data={data?.items} />
			</CardContent>
			<CardFooter>
				<TablePagination
					page={page}
					limit={limit}
					total={data.totalItems}
					onChange={handleChange}
				/>
			</CardFooter>
		</Card>
	);
}

export default function OrderListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý đơn hàng</CardTitle>
				<CardDescription>Danh sách đơn hàng</CardDescription>
				<CardAction className="flex gap-2 items-center">
					<Button variant="outline">Xuất dữ liệu</Button>
					<Button>
						<PlusIcon />
						Tạo đơn hàng
					</Button>
				</CardAction>
			</CardHeader>
			<OrderContent />
		</Card>
	);
}
