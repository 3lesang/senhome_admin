import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import type { TablePaginationDataChange } from "@/components/table/pagination";
import TablePagination from "@/components/table/pagination";
import TableTabs from "@/components/table/tabs";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getListStorePageQueryOptions } from "@/handlers/page/query/list";
import { cn } from "@/lib/utils";
import { deleteStorePagePocket } from "@/pocketbase/page/delete";
import StorePageTable from "./table";

const tabs = [{ label: "Tất cả", q: "" }];

export default function PageStoreListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/store/pages/" });

	const { data, refetch } = useSuspenseQuery(
		getListStorePageQueryOptions({ page, limit, query: q }),
	);

	const { mutate } = useMutation({
		mutationFn: (ids: string[]) => deleteStorePagePocket(ids),
		onSuccess: () => {
			refetch();
		},
	});

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/store/pages", search: { page: page, limit: limit } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/store/pages", search: { page: 1, limit: limit, q } });
	};

	const handleDelete = (id: string) => {
		mutate([id]);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Trang nội dung</CardTitle>
				<CardDescription>
					Các trang nội dung của bạn, quản lý và tạo trang mới.
				</CardDescription>
				<CardAction>
					<Link to="/store/pages/create" className={cn(buttonVariants())}>
						Tạo trang
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
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
					<StorePageTable data={data.items} onDelete={handleDelete} />
					<CardFooter>
						<TablePagination
							total={data.totalItems}
							page={page}
							limit={limit}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
