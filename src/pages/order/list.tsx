import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { InfoIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/vi";
import TimeAgo from "timeago-react";
import axiosClient from "@/axios";
import TablePagination from "@/components/table/pagination";
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
import { formatVND } from "@/lib/utils";
import { getOrdersQueryOptions } from "@/queries/order";

timeago.register("vi", vi);

export function getPaymentStatus(
	key:
		| "pending"
		| "processing"
		| "paid"
		| "failed"
		| "cancelled"
		| "refunded"
		| "expired",
) {
	const PAYMENT_STATUS: Record<string, string> = {
		pending: "Chờ thanh toán",
		processing: "Đang xử lý thanh toán",
		paid: "Đã thanh toán",
		failed: "Thanh toán thất bại",
		cancelled: "Đã hủy thanh toán",
		refunded: "Đã hoàn tiền",
		expired: "Hết hạn thanh toán",
	};

	return PAYMENT_STATUS[key];
}

export function getShippingStatus(
	key:
		| "pending"
		| "processing"
		| "shipped"
		| "delivered"
		| "returned"
		| "cancelled",
) {
	const SHIPPING_STATUS: Record<string, string> = {
		pending: "Chờ xử lý",
		processing: "Đang chuẩn bị hàng",
		shipped: "Đã gửi hàng",
		delivered: "Đã giao hàng",
		returned: "Đã hoàn hàng",
		cancelled: "Đã hủy giao hàng",
	};

	return SHIPPING_STATUS[key];
}

export function OrderListPage() {
	const { page, limit, query } = useSearch({ from: "/(app)/order/" });

	const getOrdersQuery = useSuspenseQuery(getOrdersQueryOptions());

	const deleteOrdersMutation = useMutation({
		mutationFn: (ids: number[]) => {
			return axiosClient.delete("/orders", { data: { ids } });
		},
		onSuccess: () => {
			getOrdersQuery.refetch();
		},
	});

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý đơn hàng</CardTitle>
				<CardDescription>Danh sách đơn hàng</CardDescription>
				<CardAction className="flex gap-2 items-center">
					<Button variant="outline">Xuất dữ liệu</Button>
					<Button>Tạo đơn hàng</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TabsButton
								tabs={[
									{ label: "Tất cả đơn hàng", value: "" },
									{ label: "Đơn hàng mới", value: `status="created"` },
									{
										label: "Chưa giao hàng",
										value: `shipping_status!="delivered"`,
									},
									{ label: "Chưa thanh toán", value: `payment_status!="paid"` },
								]}
								value={query}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">
								{getOrdersQuery.data.data.total_items} đơn hàng
							</Badge>
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
						<TableHeader className="bg-gray-50">
							<TableRow className="">
								<TableHead className="w-16 text-center">
									<Checkbox />
								</TableHead>
								<TableHead>Tổng tiền</TableHead>
								<TableHead>Ngày tạo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{getOrdersQuery.data.data.data?.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow className="group">
											<TableCell className="text-center w-16">
												<Checkbox />
											</TableCell>
											<TableCell>{formatVND(item.total_amount)}</TableCell>
											<TableCell>
												<TimeAgo datetime={item.created} locale="vi" />
											</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link to="/order/$id" params={{ id: item.id.toString() }}>
											<ContextMenuItem>
												<InfoIcon />
												Chi tiết
											</ContextMenuItem>
										</Link>
										<ContextMenuItem
											onClick={() =>
												deleteOrdersMutation.mutateAsync([item.id])
											}
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
							page={page}
							limit={limit}
							total={getOrdersQuery.data.data.total_items}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
