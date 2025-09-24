import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table-pagination";
import TableTabs from "@/components/table-tabs";
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
import { getListProductQueryOptions } from "@/handlers/product/query/list";
import ProductTable from "./table";

const tabs = [
	{ label: "Tất cả sản phẩm", q: "" },
	{ label: "Đang hoạt động", q: "deleted=null" },
	{ label: "Bản nháp", q: "deleted!=null" },
];

export default function ProductContent() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/products/" });

	const { data } = useSuspenseQuery(
		getListProductQueryOptions({
			page,
			limit,
			query: q,
		}),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/products", search: { page: page, limit: limit } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/products", search: { page: 1, limit: limit, q } });
	};

	return (
		<Card className="border-0 shadow-none bg-sidebar">
			<CardHeader>
				<CardTitle>
					<TableTabs data={tabs} onChange={handleTabChange} q={q} />
				</CardTitle>
				<CardDescription>
					<Badge variant="secondary">{data.totalItems} sản phẩm</Badge>
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
			<CardContent>
				<ProductTable data={data.items} />
			</CardContent>
			<CardFooter>
				<TablePagination
					page={page}
					limit={limit}
					onChange={handlePaginationChange}
					total={data.totalItems}
				/>
			</CardFooter>
		</Card>
	);
}
