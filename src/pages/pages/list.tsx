import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { format } from "timeago.js";
import { deleteStorePagesHandler } from "@/api/page/mutation/delete";
import { getStorePagesQueryOptions } from "@/api/page/query/list";
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

const tabs = [{ label: "Tất cả", q: "" }];

export function PageStoreListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/store/pages/" });

	const { data, refetch } = useSuspenseQuery(
		getStorePagesQueryOptions({ page, limit, query: q }),
	);

	const { mutate } = useMutation({
		mutationFn: deleteStorePagesHandler,
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
					<Table className="bg-white rounded-md">
						<TableHeader className="bg-sidebar">
							<TableRow>
								<TableHead className="w-16 pl-6">
									<Checkbox />
								</TableHead>
								<TableHead>Tên chính sách</TableHead>
								<TableHead>Ngày tạo</TableHead>
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
													to="/store/pages/$id"
													params={{ id: item?.id }}
													className="hover:underline"
												>
													{item?.title}
												</Link>
											</TableCell>
											<TableCell>{format(new Date(item?.created))}</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link to="/store/pages/$id" params={{ id: item?.id }}>
											<ContextMenuItem>
												<EditIcon />
												Chỉnh sửa
											</ContextMenuItem>
										</Link>
										<ContextMenuItem onClick={() => handleDelete?.(item.id)}>
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
