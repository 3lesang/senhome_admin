import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table-pagination";
import TableTabs from "@/components/table-tabs";
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
import { getListCollectionQueryOptions } from "@/handlers/collection/query/list";
import { cn } from "@/lib/utils";
import { deleteCollectionsPocket } from "@/pocketbase/collection/delete";
import CollectionTable from "./table";

export default function CollectionListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({
		from: "/(app)/products/collections/",
	});

	const { data, refetch } = useSuspenseQuery(
		getListCollectionQueryOptions({ page, limit, query: q }),
	);

	const { mutate } = useMutation({
		mutationFn: (ids: string[]) => deleteCollectionsPocket(ids),
		onSuccess: () => {
			refetch();
		},
	});

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({
			to: "/products/collections",
			search: { page: page, limit: limit },
		});
	};

	const handleTabChange = (q: string) => {
		navigate({
			to: "/products/collections",
			search: { page: 1, limit: limit, q },
		});
	};

	const handleDelete = (id: string) => {
		mutate([id]);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý nhóm sản phẩm</CardTitle>
				<CardDescription>
					Nhóm sản phẩm giúp quản lý sản phẩm và khách hàng tìm kiếm sản phẩm
					một cách dễ dàng.
				</CardDescription>
				<CardAction>
					<Link
						to="/products/collections/create"
						className={cn(buttonVariants())}
					>
						<PlusIcon />
						Tạo nhóm sản phẩm
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TableTabs
								data={[{ label: "All", q: "" }]}
								onChange={handleTabChange}
								q=""
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data.totalItems} banner</Badge>
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
					<CollectionTable data={data.items} onDelete={handleDelete} />
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
