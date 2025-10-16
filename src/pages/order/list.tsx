import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
	InfoIcon,
	ListFilterIcon,
	SearchIcon,
	Trash2Icon,
	UserCircleIcon,
} from "lucide-react";
import * as timeago from "timeago.js";
import vi from "timeago.js/lib/lang/vi";
import TimeAgo from "timeago-react";
import { getListOrderQueryOptions } from "@/api/order/list";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
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
	const navigate = useNavigate();
	const { page, limit, query } = useSearch({ from: "/(app)/orders/" });

	const { data } = useSuspenseQuery(
		getListOrderQueryOptions({ page, limit, query }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/orders", search: { page, limit, query } });
	};

	const handleTabChange = (query: string) => {
		navigate({ to: "/orders", search: { page: 1, limit: limit, query } });
	};

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
								onChange={handleTabChange}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data.totalItems} đơn hàng</Badge>
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
								<TableHead>Khách hàng</TableHead>
								<TableHead>Thanh toán</TableHead>
								<TableHead>Giao hàng</TableHead>
								<TableHead>Tổng tiền</TableHead>
								<TableHead>Ngày tạo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.items.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow className="group">
											<TableCell className="text-center w-16">
												<Checkbox />
											</TableCell>
											<TableCell>
												<Link
													to="/orders/$id"
													params={{ id: item.id }}
													className="hover:underline"
												>
													{item.id}
												</Link>
											</TableCell>
											<TableCell>
												<Badge variant="secondary">
													<UserCircleIcon />
													{item.customer.name}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge variant="secondary">
													{getPaymentStatus(item.payment_status)}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge variant="secondary">
													{getShippingStatus(item.shipping_status)}
												</Badge>
											</TableCell>
											<TableCell>{formatVND(item.final_price)}</TableCell>
											<TableCell>
												<TimeAgo datetime={item.created} locale="vi" />
											</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link to="/orders/$id" params={{ id: item.id }}>
											<ContextMenuItem>
												<InfoIcon />
												Chi tiết
											</ContextMenuItem>
										</Link>
										<ContextMenuItem>
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
							total={data.totalItems}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
