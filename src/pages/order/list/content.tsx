import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon } from "lucide-react";
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
import { getListOrderQueryOptions } from "@/handlers/order/query/list";
import OrderTable from "./table";

const tabs: TableTableDataType[] = [
	{ label: "Tất cả đơn hàng", q: "" },
	{ label: "Đơn hàng mới", q: `status="created"` },
	{ label: "Chưa giao hàng", q: `status="completed"` },
	{ label: "Chưa thanh toán", q: `status="canceled"` },
];

export default function OrderContent() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/orders/" });

	const { data } = useSuspenseQuery(
		getListOrderQueryOptions({ page, limit, query: q }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/orders", search: { page, limit, q } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/orders", search: { page: 1, limit: limit, q } });
	};

	return (
		<Card className="border-0 shadow-none bg-sidebar">
			<CardHeader>
				<CardTitle>
					<TableTabs data={tabs} q={q} onChange={handleTabChange} />
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
					onChange={handlePaginationChange}
				/>
			</CardFooter>
		</Card>
	);
}
