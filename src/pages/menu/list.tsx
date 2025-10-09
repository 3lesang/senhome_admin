import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, TrashIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
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
import { deleteMenusHandler } from "@/handlers/menu/mutation/delete";
import { getListMenuQueryOptions } from "@/handlers/menu/query/list";
import { cn } from "@/lib/utils";

export function MenuListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/store/menus/" });

	const { data, refetch } = useSuspenseQuery(
		getListMenuQueryOptions({ page, limit, query: q }),
	);

	const { mutate } = useMutation({
		mutationFn: deleteMenusHandler,
		onSuccess: () => {
			refetch();
		},
	});

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/store/menus", search: { page, limit, q } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/store/menus", search: { page: 1, limit: limit, q } });
	};

	const handleDelete = (id: string) => {
		mutate([id]);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Menu</CardTitle>
				<CardDescription>
					Menu hoặc danh sách liên kết website , giúp khách hàng chuyển trang
					trong cửa hàng của bạn. Bạn có thể tạo các menu lồng nhau để hiện thị
					drop-down menus
				</CardDescription>
				<CardAction>
					<Link to="/store/menus/create" className={cn(buttonVariants())}>
						Tạo menu
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="shadow-none border-0">
					<CardHeader>
						<CardTitle>
							<TableTabs
								data={[{ label: "Tất cả", q: "" }]}
								q=""
								onChange={handleTabChange}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data.totalItems} menu</Badge>
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
					<Table>
						<TableHeader className="bg-sidebar">
							<TableRow>
								<TableHead className="w-16 pl-6">
									<Checkbox />
								</TableHead>
								<TableHead>Tên</TableHead>
								<TableHead>Vị trí</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.items.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="pl-6">
												<Checkbox />
											</TableCell>
											<TableCell>
												<Link
													to="/store/menus/$id"
													params={{ id: item.id }}
													className="hover:underline"
												>
													{item?.name}
												</Link>
											</TableCell>
											<TableCell>{item?.position}</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link to="/store/menus/$id" params={{ id: item.id }}>
											<ContextMenuItem>
												<EditIcon />
												Chỉnh sửa
											</ContextMenuItem>
										</Link>
										<ContextMenuItem onClick={() => handleDelete?.(item.id)}>
											<TrashIcon />
											Xóa
										</ContextMenuItem>
									</ContextMenuContent>
								</ContextMenu>
							))}
						</TableBody>
					</Table>
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
