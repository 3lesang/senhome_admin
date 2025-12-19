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
import { cn, formatVND } from "@/lib/utils";
import { getShippingFeesQueryOptions } from "@/queries/shipping-fee";

export function DeliveryListPage() {
	const { page, limit } = useSearch({ from: "/(app)/deliveries/" });
	const [pagination, setPagination] = useState({
		page,
		limit,
	});
	const getShippingFeeQuery = useSuspenseQuery(
		getShippingFeesQueryOptions({ page, limit }),
	);

	const deletePageMutaion = useMutation({
		mutationFn: (ids: number[]) => {
			return axiosClient.delete("/shipping-fees", { data: { ids } });
		},
		onSuccess: () => {
			getShippingFeeQuery.refetch();
		},
	});

	const handlePaginationChange = (value: TablePaginationDataChange) => {
		setPagination(value);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Vận chuyển</CardTitle>
				<CardDescription>Cài đặt thông tin vận chuyển</CardDescription>
				<CardAction>
					<Link to="/deliveries/create" className={cn(buttonVariants())}>
						Thêm mới
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
								{getShippingFeeQuery.data.data.total_items} phí vận chuyển
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
								<TableHead>Tên</TableHead>
								<TableHead>Cân nặng thấp nhất(gr)</TableHead>
								<TableHead>Cân nặng cao nhất(gr)</TableHead>
								<TableHead>Phí vận chuyển</TableHead>
								<TableHead>Đơn tối thiểu</TableHead>
								<TableHead>Miễn phí vận chuyển</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{getShippingFeeQuery.data.data.data?.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="pl-6">
												<Checkbox />
											</TableCell>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.min_weight}</TableCell>
											<TableCell>{item.max_weight}</TableCell>
											<TableCell>{formatVND(item.fee_amount)}</TableCell>
											<TableCell>{formatVND(item.min_order_value)}</TableCell>
											<TableCell>
												{item.free_shipping && <Badge>Miễn phí</Badge>}
											</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link
											to="/deliveries/$id"
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
							total={getShippingFeeQuery.data.data.total_items}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
