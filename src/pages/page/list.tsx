import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import axiosClient from "@/axios";
import type { TablePaginationDataChange } from "@/components/table/pagination";
import TablePagination from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
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
import { getPagesQueryOptions } from "@/queries/page";

export function PageStoreListPage() {
	const { page, limit, query } = useSearch({ from: "/(app)/stores/pages/" });
	const [pagination, setPagination] = useState({
		page,
		limit,
	});
	const getPagesQuery = useSuspenseQuery(
		getPagesQueryOptions({
			page: pagination.page,
			limit: pagination.limit,
			query,
		}),
	);

	const deletePageMutaion = useMutation({
		mutationFn: (ids: number[]) => {
			return axiosClient.delete("/pages", { data: { ids } });
		},
		onSuccess: () => {
			getPagesQuery.refetch();
		},
	});

	const handlePaginationChange = (value: TablePaginationDataChange) => {
		setPagination(value);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Trang nội dung</CardTitle>
				<CardDescription>
					Các trang nội dung của bạn, quản lý và tạo trang mới.
				</CardDescription>
				<CardAction>
					<Link to="/stores/pages/create" className={cn(buttonVariants())}>
						Tạo trang
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TabsButton tabs={[{ label: "Tất cả", value: "" }]} value="" />
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">
								{getPagesQuery.data.data.total_items} trang
							</Badge>
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
								<TableHead>Đường dẫn</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{getPagesQuery.data.data.data?.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="pl-6">
												<Checkbox />
											</TableCell>
											<TableCell>
												<Link
													to="/stores/pages/$id"
													params={{ id: item?.id.toString() }}
													className="hover:underline"
												>
													{item?.name}
												</Link>
											</TableCell>
											<TableCell>{item.slug}</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link
											to="/stores/pages/$id"
											params={{ id: item?.id.toString() }}
										>
											<ContextMenuItem>
												<EditIcon />
												Chỉnh sửa
											</ContextMenuItem>
										</Link>
										<ContextMenuItem
											onClick={() => deletePageMutaion.mutateAsync([item.id])}
										>
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
							page={pagination.page}
							limit={pagination.limit}
							total={getPagesQuery.data.data.total_items}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
