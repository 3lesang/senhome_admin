import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { format } from "timeago.js";
import { deleteCollectionsHandler } from "@/api/collection/mutation/delete";
import { getCollectionsQueryOptions } from "@/api/collection/query/list";
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
import { cn } from "@/lib/utils";

export function CollectionListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({
		from: "/(app)/products/collections/",
	});

	const { data, refetch } = useSuspenseQuery(
		getCollectionsQueryOptions({ page, limit, query: q }),
	);

	const { mutate } = useMutation({
		mutationFn: deleteCollectionsHandler,
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
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
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
						Tạo nhóm sản phẩm
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TableTabs
								data={[{ label: "Tất cả", q: "" }]}
								onChange={handleTabChange}
								q={q}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data.totalItems} nhóm sản phẩm</Badge>
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
								<TableHead>Tên</TableHead>
								<TableHead>Ngày tạo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.items.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="pl-6">
												<Checkbox />
											</TableCell>
											<TableCell>
												<Link
													to="/products/collections/$id"
													params={{ id: item?.id }}
													className="hover:underline"
												>
													{item?.name}
												</Link>
											</TableCell>
											<TableCell>{format(new Date(item?.created))}</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link
											to="/products/collections/$id"
											params={{ id: item?.id }}
										>
											<ContextMenuItem>
												<EditIcon />
												Chỉnh sửa
											</ContextMenuItem>
										</Link>

										<ContextMenuItem onClick={() => handleDelete(item.id)}>
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
