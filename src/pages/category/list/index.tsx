import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import TableTabs from "@/components/table/tabs";
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
import { getListCategoryQueryOptions } from "@/handlers/category/query/list";
import CategoryTable from "./table";

export default function CategoryListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/categories/" });

	const { data } = useSuspenseQuery(
		getListCategoryQueryOptions({ page, limit, query: q }),
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
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh mục</CardTitle>
				<CardDescription>Danh sách danh mục sản phẩm</CardDescription>
				<CardAction>
					<Button>Tạo danh mục</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TableTabs
								data={[{ label: "Tất cả danh mục", q: "" }]}
								q={q}
								onChange={handleTabChange}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data?.totalItems} danh mục</Badge>
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
					<CategoryTable data={data?.items} />
					<CardFooter>
						<TablePagination
							total={data?.totalItems}
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
