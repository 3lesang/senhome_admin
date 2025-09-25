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
import { getListStorePageQueryOptions } from "@/handlers/store/query/page/list";
import PolicyTable from "./table";

const tabs = [{ label: "Tất cả trang", q: "" }];

export default function ContentPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/store/pages/" });
	const { data } = useSuspenseQuery(
		getListStorePageQueryOptions({ page, limit, query: q }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/store/pages", search: { page: page, limit: limit } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/store/pages", search: { page: 1, limit: limit, q } });
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none">
			<CardHeader>
				<CardTitle>
					<TableTabs data={tabs} onChange={handleTabChange} q={q} />
				</CardTitle>
				<CardDescription>
					<Badge variant="secondary">{data.totalItems} trang</Badge>
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
				<PolicyTable data={data.items} />
			</CardContent>
			<CardFooter>
				<TablePagination
					total={data.totalItems}
					page={page}
					limit={limit}
					onChange={handlePaginationChange}
				/>
			</CardFooter>
		</Card>
	);
}
