import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { format } from "timeago.js";
import { getListCategoryQueryOptions } from "@/api/category/list";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function CategoryListPage() {
	const navigate = useNavigate();
	const { page, limit, query } = useSearch({ from: "/(app)/categories/" });

	const { data } = useSuspenseQuery(
		getListCategoryQueryOptions({ page, limit, query }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/products", search: { page, limit } });
	};

	const handleTabChange = (query: string) => {
		navigate({ to: "/products", search: { page: 1, limit, query } });
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
							<TabsButton
								tabs={[{ label: "Tất cả danh mục", value: "" }]}
								value={query}
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
					<Table className="bg-white rounded-md">
						<TableHeader className="bg-sidebar">
							<TableRow>
								<TableHead className="w-16 pl-6">
									<Checkbox />
								</TableHead>
								<TableHead>Tên danh mục</TableHead>
								<TableHead>Ngày tạo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.items?.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="pl-6">
												<Checkbox />
											</TableCell>
											<TableCell>{item.name}</TableCell>
											<TableCell>{format(new Date(item.created))}</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<ContextMenuItem>
											<EditIcon />
											Chỉnh sửa
										</ContextMenuItem>

										<ContextMenuItem onClick={() => {}}>
											<Trash2Icon />
											Xóa
										</ContextMenuItem>
									</ContextMenuContent>
								</ContextMenu>
							))}
						</TableBody>
					</Table>
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
