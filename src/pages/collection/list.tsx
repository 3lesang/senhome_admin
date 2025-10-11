import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { format } from "timeago.js";
import { deleteCollectionsHandler } from "@/api/collection/delete";
import { getCollectionsQueryOptions } from "@/api/collection/list";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { cn, convertToFileUrl } from "@/lib/utils";

export function CollectionListPage() {
	const navigate = useNavigate();
	const { page, limit, query } = useSearch({
		from: "/(app)/products/collections/",
	});

	const { data, refetch } = useSuspenseQuery(
		getCollectionsQueryOptions({ page, limit, query }),
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

	const handleTabChange = (query: string) => {
		navigate({
			to: "/products/collections",
			search: { page: 1, limit: limit, query },
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
							<TabsButton
								tabs={[{ label: "Tất cả", value: "" }]}
								onChange={handleTabChange}
								value={query}
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
								<TableHead className="w-16 text-center">
									<Checkbox />
								</TableHead>
								<TableHead></TableHead>
								<TableHead>Tên</TableHead>
								<TableHead>Ngày tạo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.items.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="text-center">
												<Checkbox />
											</TableCell>
											<TableCell className="w-8">
												<Avatar className="rounded overflow-hidden bg-neutral-50">
													<AvatarImage
														src={convertToFileUrl(item.expand.file)}
														className="object-contain"
													/>
													<AvatarFallback className="rounded" />
												</Avatar>
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
