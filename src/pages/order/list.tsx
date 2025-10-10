import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { format } from "timeago.js";
import { getListOrderQueryOptions } from "@/api/order/list";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatVND } from "@/lib/utils";

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
									{ label: "Chưa giao hàng", value: `status="completed"` },
									{ label: "Chưa thanh toán", value: `status="canceled"` },
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
								<TableHead className="w-8"></TableHead>
								<TableHead>
									<Checkbox />
								</TableHead>
								<TableHead>Mã</TableHead>
								<TableHead>Ngày tạo</TableHead>
								<TableHead>Khách hàng</TableHead>
								<TableHead>Thanh toán</TableHead>
								<TableHead>Giao hàng</TableHead>
								<TableHead>Tổng tiền</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.items.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow className="group">
											<TableCell></TableCell>
											<TableCell>
												<Checkbox />
											</TableCell>
											<TableCell>{item.id}</TableCell>
											<TableCell>{format(new Date(item.created))}</TableCell>
											<TableCell>
												<HoverCard>
													<HoverCardTrigger asChild>
														<Badge
															variant="secondary"
															className="cursor-pointer"
														>
															{item.name}
														</Badge>
													</HoverCardTrigger>
													<HoverCardContent>
														<div className="flex justify-between gap-2">
															<Avatar>
																<AvatarFallback>U</AvatarFallback>
															</Avatar>
															<div className="space-y-1">
																<h4 className="text-sm font-semibold">
																	{item.name}
																</h4>
																<p className="text-sm">{item.email}</p>
																<div className="text-muted-foreground text-xs">
																	{item.phone}
																</div>
															</div>
														</div>
													</HoverCardContent>
												</HoverCard>
											</TableCell>
											<TableCell>
												<Badge variant="secondary">Chờ xử lý</Badge>
											</TableCell>
											<TableCell>
												<Badge variant="outline">Chưa giao hàng</Badge>
											</TableCell>
											<TableCell>{formatVND(item.final_price)}</TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
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
