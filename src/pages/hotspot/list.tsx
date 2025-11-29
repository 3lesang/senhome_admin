import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import axiosClient from "@/axios";
import type { TablePaginationDataChange } from "@/components/table/pagination";
import TablePagination from "@/components/table/pagination";
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
import { getHotspotsQueryOptions } from "@/queries/hotspot";

export function HotSpotListPage() {
	const { page, limit } = useSearch({
		from: "/(app)/products/collections/hotspots/",
	});
	const [pagination, setPagination] = useState({
		page,
		limit,
	});

	const getHotspotsQuery = useSuspenseQuery(
		getHotspotsQueryOptions({ page, limit }),
	);

	const deletePageMutaion = useMutation({
		mutationFn: (ids: number[]) => {
			return axiosClient.delete("/hotspots", { data: { ids } });
		},
		onSuccess: () => {
			getHotspotsQuery.refetch();
		},
	});

	const handlePaginationChange = (value: TablePaginationDataChange) => {
		setPagination(value);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý bộ sưu tập</CardTitle>
				<CardDescription>
					Các bộ sưu tập của bạn, quản lý và tạo bộ sưu tập mới.
				</CardDescription>
				<CardAction>
					<Link
						to="/products/collections/hotspots/create"
						className={cn(buttonVariants())}
					>
						Tạo bộ sưu tập
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
								{getHotspotsQuery.data.data.total_items} bộ sưu tập
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
								<TableHead>Hình ảnh</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{getHotspotsQuery.data.data.data?.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="pl-6">
												<Checkbox />
											</TableCell>
											<TableCell>
												<Avatar className="rounded bg-neutral-100">
													<AvatarImage
														className="object-contain"
														src={convertToFileUrl(item.file)}
													/>
													<AvatarFallback className="rounded">B</AvatarFallback>
												</Avatar>
											</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link
											to="/products/collections/hotspots/$id"
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
							total={getHotspotsQuery.data.data.total_items}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
