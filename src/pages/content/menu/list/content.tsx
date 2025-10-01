import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table-pagination";
import TableTabs from "@/components/table-tabs";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getListMenuQueryOptions } from "@/handlers/menu/query/list";
import { deleteMenusPocket } from "@/pocketbase/menu/delete";
import MenuTable from "./table";

export default function MenuContent() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/content/menus/" });

	const { data, refetch } = useSuspenseQuery(
		getListMenuQueryOptions({ page, limit, query: q }),
	);

	const { mutate } = useMutation({
		mutationFn: (ids: string[]) => deleteMenusPocket(ids),
		onSuccess: () => {
			refetch();
		},
	});

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/content/menus", search: { page, limit, q } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/content/menus", search: { page: 1, limit: limit, q } });
	};

	const handleDelete = (id: string) => {
		mutate([id]);
	};

	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>
					<TableTabs
						data={[{ label: "Tất cả", q: "" }]}
						q=""
						onChange={handleTabChange}
					/>
				</CardTitle>
				<CardAction className="flex items-center gap-2">
					<Button size="icon" variant="outline">
						<SearchIcon />
					</Button>
					<Button variant="outline" size="icon">
						<ListFilterIcon />
					</Button>
				</CardAction>
			</CardHeader>
			<MenuTable data={data.items} onDelete={handleDelete} />
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
