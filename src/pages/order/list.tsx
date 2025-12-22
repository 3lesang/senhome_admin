import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	InfoIcon,
	ListFilterIcon,
	MoreVerticalIcon,
	SearchIcon,
	Trash2Icon,
} from "lucide-react";
import { useState } from "react";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	const navigate = useNavigate();
	const { page, limit, query } = useSearch({ from: "/(app)/orders/" });

	const [pagination, setPagination] = useState({
		page,
		limit,
	});

	const getOrdersQuery = useSuspenseQuery(
		getOrdersQueryOptions({ page: pagination.page, limit: pagination.limit }),
	);

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
								<TableHead>Mã đơn hàng</TableHead>
								<TableHead>Sản phẩm</TableHead>
								<TableHead>Khách hàng</TableHead>
								<TableHead>Tổng đơn hàng</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead>Ngày tạo</TableHead>
								<TableHead></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{getOrdersQuery.data.data.data?.map((item) => (
								<>
									<TableRow className="group">
										<TableCell className="text-center w-16">
											<Checkbox />
										</TableCell>
										<TableCell>{item.code}</TableCell>
										<TableCell></TableCell>
										<TableCell>{item.full_name}</TableCell>
										<TableCell>{formatVND(item.total_amount)}</TableCell>
										<TableCell></TableCell>
										<TableCell>
											{new Date(item.created_at).toLocaleString()}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button type="button" size="icon" variant="ghost">
														<MoreVerticalIcon />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuItem
														onClick={() => {
															navigate({
																to: "/orders/$id",
																params: {
																	id: item.id.toString(),
																},
															});
														}}
													>
														<InfoIcon />
														Chi tiết
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															deleteOrdersMutation.mutateAsync([item.id])
														}
													>
														<Trash2Icon />
														Xóa
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									{item.items.map((i) => (
										<TableRow key={item.id}>
											<TableCell className="text-center w-16"></TableCell>
											<TableCell></TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<p>{i.name}</p>
													<Badge variant="secondary">
														SKU: {i.variant_sku ?? i.product_sku}
													</Badge>
													{i.options.map((o) => (
														<Badge key={o.value} variant="secondary">
															{o.value}
														</Badge>
													))}
													<Badge variant="secondary">
														Số lượng: {i.quantity}
													</Badge>
												</div>
											</TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
										</TableRow>
									))}
								</>
							))}
						</TableBody>
					</Table>
					<CardFooter>
						<TablePagination
							page={page}
							limit={limit}
							total={getOrdersQuery.data.data.total_items}
							onChange={setPagination}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
