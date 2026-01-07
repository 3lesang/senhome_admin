import { useMutation, useQuery } from "@tanstack/react-query";
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
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatVND } from "@/lib/utils";
import {
	getCountOrderQueryOptions,
	getOrdersQueryOptions,
} from "@/queries/order";

export type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipping"
	| "shipped"
	| "cancelled";

const CANCEL_REASON: Record<string, string> = {
	1: "Khách yêu cầu hủy đơn",
	2: "Shop hủy đơn: Không liên lạc được với khách hàng để xác nhận đơn",
	3: "Giao thất bại: Khách từ chối nhận hàng",
	4: "Giao thất bại: Giao sai mã/ thiếu link kiện/ bể vỡ",
	5: "Giao thất bại: do thất lạc",
	6: "Trả hàng: hàng nguyên vẹn nhưng không còn nhu cầu nữa",
	7: "Trả hàng: sản phẩm lỗi không hoạt động được",
};

// type PaymentStatus = "pending" | "paid" | "failed" | "cancelled";
// function getPaymentStatus(key: PaymentStatus) {
// 	const PAYMENT_STATUS: Record<string, string> = {
// 		pending: "Chờ thanh toán",
// 		paid: "Đã thanh toán",
// 		failed: "Thanh toán thất bại",
// 		cancelled: "Đã hủy thanh toán",
// 	};
// 	return PAYMENT_STATUS[key];
// }

function getOrderStatus(key: OrderStatus) {
	const ORDER_STATUS: Record<string, string> = {
		pending: "Chờ lấy hàng",
		confirmed: "Đã xử lý",
		shipping: "Đang vận chuyển",
		shipped: "Giao hàng thành công",
		cancelled: "Đơn hủy",
	};
	return ORDER_STATUS[key];
}

export function OrderListPage() {
	const navigate = useNavigate();
	const [openCancel, setOpenCancel] = useState(false);
	const [cancelId, setCancelId] = useState<number>(0);
	const [cancelReasonKey, setCancelReasonKey] = useState("1");
	const [orderStatus, setOrderStatus] = useState<OrderStatus>("pending");
	const [isConfirm, setIsConfirm] = useState(false);

	const { page, limit } = useSearch({ from: "/(app)/orders/" });

	const [pagination, setPagination] = useState({
		page,
		limit,
	});

	const getOrdersQuery = useQuery(
		getOrdersQueryOptions({
			page: pagination.page,
			limit: pagination.limit,
			status:
				orderStatus === "pending" && isConfirm
					? "confirmed"
					: (orderStatus as string),
		}),
	);

	const getCountOrdersQuery = useQuery(getCountOrderQueryOptions());

	const deleteOrdersMutation = useMutation({
		mutationFn: (ids: number[]) => {
			return axiosClient.delete("/orders", { data: { ids } });
		},
		onSuccess: () => {
			getOrdersQuery.refetch();
			getCountOrdersQuery.refetch();
		},
	});

	const updateOrderStatusMutation = useMutation({
		mutationFn: (value: {
			id: number;
			status: string;
			cancel_reason?: string;
		}) => {
			return axiosClient.put(`/orders/${value.id}/status`, {
				status: value.status,
				cancel_reason: value.cancel_reason,
			});
		},
		onSuccess: () => {
			getOrdersQuery.refetch();
			getCountOrdersQuery.refetch();
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
									{ label: "Chờ lấy hàng", value: "pending" },
									{
										label: `Đang vận chuyển (${getCountOrdersQuery.data?.data.shipping_count})`,
										value: "shipping",
									},
									{
										label: `Giao hàng thành công (${getCountOrdersQuery.data?.data.shipped_count})`,
										value: "shipped",
									},
									{
										label: `Đơn hủy (${getCountOrdersQuery.data?.data.cancelled_count})`,
										value: "cancelled",
									},
								]}
								value={orderStatus}
								onChange={(value) => setOrderStatus(value as OrderStatus)}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">
								{getOrdersQuery.data?.data.total_items} đơn hàng
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
					<CardContent>
						{orderStatus === "pending" && (
							<div className="flex items-center gap-2">
								<Button
									type="button"
									variant={!isConfirm ? "secondary" : "ghost"}
									onClick={() => setIsConfirm(false)}
								>
									Chưa xử lý ({getCountOrdersQuery.data?.data.pending_count})
								</Button>
								<Button
									type="button"
									variant={isConfirm ? "secondary" : "ghost"}
									onClick={() => setIsConfirm(true)}
								>
									Đã xử lý ({getCountOrdersQuery.data?.data.confirmed_count})
								</Button>
							</div>
						)}
					</CardContent>
					<Dialog open={openCancel} onOpenChange={setOpenCancel}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Lý do hủy đơn?</DialogTitle>
								<DialogDescription></DialogDescription>
							</DialogHeader>
							<RadioGroup defaultValue="1" onValueChange={setCancelReasonKey}>
								{Object.entries(CANCEL_REASON).map(([key, value]) => (
									<div key={key} className="flex items-center space-x-2">
										<RadioGroupItem value={key} id={key} />
										<Label htmlFor={key}>{value}</Label>
									</div>
								))}
							</RadioGroup>
							<DialogFooter>
								<DialogClose asChild>
									<Button type="button" variant="outline">
										Hủy
									</Button>
								</DialogClose>
								<Button
									type="button"
									onClick={() => {
										updateOrderStatusMutation.mutate({
											id: cancelId,
											status: "cancelled",
											cancel_reason: CANCEL_REASON[cancelReasonKey],
										});
										setOpenCancel(false);
									}}
								>
									Hủy đơn
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
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
							{getOrdersQuery.data?.data.data?.map((item) => (
								<>
									<TableRow className="group">
										<TableCell className="text-center w-16">
											<Checkbox />
										</TableCell>
										<TableCell>{item.code}</TableCell>
										<TableCell></TableCell>
										<TableCell>{item.full_name}</TableCell>
										<TableCell>{formatVND(item.total_amount)}</TableCell>
										<TableCell>{getOrderStatus(item.status)}</TableCell>
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
													{item.status === "pending" && (
														<DropdownMenuItem
															onClick={() => {
																updateOrderStatusMutation.mutate({
																	id: item.id,
																	status: "confirmed",
																});
															}}
														>
															Chuẩn bị hàng
														</DropdownMenuItem>
													)}
													{item.status === "confirmed" && (
														<DropdownMenuItem
															onClick={() => {
																updateOrderStatusMutation.mutate({
																	id: item.id,
																	status: "shipping",
																});
															}}
														>
															Giao hàng
														</DropdownMenuItem>
													)}
													{item.status === "shipping" && (
														<DropdownMenuItem
															onClick={() => {
																updateOrderStatusMutation.mutate({
																	id: item.id,
																	status: "shipped",
																});
															}}
														>
															Giao thành công
														</DropdownMenuItem>
													)}
													{item.status !== "cancelled" && (
														<DropdownMenuItem
															onClick={() => {
																setCancelId(item.id);
																setOpenCancel(true);
															}}
														>
															Hủy đơn
														</DropdownMenuItem>
													)}
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
							page={pagination.page}
							limit={pagination.limit}
							total={getOrdersQuery.data?.data.total_items ?? 0}
							onChange={setPagination}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
