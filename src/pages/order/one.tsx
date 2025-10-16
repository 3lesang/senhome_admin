import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { MailIcon, PhoneIcon } from "lucide-react";
import { getItemsOrder } from "@/api/order/list";
import { getOrder } from "@/api/order/one";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemHeader,
	ItemTitle,
} from "@/components/ui/item";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { convertToFileUrl, formatVND } from "@/lib/utils";
import { getPaymentStatus } from "./list";

export function OneOrderPage() {
	const { id } = useParams({ from: "/(app)/orders/$id" });
	const { data: order } = useSuspenseQuery(getOrder(id));
	const { data: items } = useSuspenseQuery(getItemsOrder(order.id));

	return (
		<Card className="max-w-6xl mx-auto bg-transparent border-0 shadow-none">
			<CardHeader>
				<CardTitle>Mã {order.id}</CardTitle>
				<CardDescription>
					<Badge variant="secondary">
						{getPaymentStatus(order.payment_status)}
					</Badge>
				</CardDescription>
				<CardAction></CardAction>
			</CardHeader>
			<CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4">
				<div className="col-span-8">
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>Sản phẩm</CardTitle>
							<CardDescription>
								<Badge variant="secondary">{items.totalItems} sản phẩm</Badge>
							</CardDescription>
						</CardHeader>
						<Table>
							<TableHeader className="bg-sidebar">
								<TableRow>
									<TableHead></TableHead>
									<TableHead>Tên sản phẩm</TableHead>
									<TableHead>Số lượng</TableHead>
									<TableHead>Giá </TableHead>
									<TableHead>Thành tiền</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{items.items.map((item) => (
									<TableRow key={item.id}>
										<TableCell className="pl-6">
											<Avatar className="rounded">
												<AvatarImage
													src={convertToFileUrl(
														item.expand.product.expand.thumbnail,
													)}
												/>
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
										</TableCell>
										<TableCell className="whitespace-normal">
											<Link
												to="/products/$id"
												params={{ id: item.expand.product.id }}
												className="hover:underline line-clamp-1"
											>
												{item.expand.product.name}
											</Link>
											<div className="space-x-1">
												{item.expand.variant.combos.split(",").map((item) => (
													<Badge key={item} variant="secondary">
														{item}
													</Badge>
												))}
											</div>
										</TableCell>
										<TableCell>{item.quantity}</TableCell>
										<TableCell>
											<span>{formatVND(item.sale_price)}</span>
										</TableCell>
										<TableCell></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Card>
				</div>
				<div className="col-span-4">
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>Thông Tin Người Mua</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<Item variant="muted">
								<ItemContent>
									<ItemTitle>{order.customer.name}</ItemTitle>
									<ItemDescription className="space-x-2">
										<PhoneIcon className="size-4 inline" />
										<span>{order.customer.phome}</span>
										<MailIcon className="size-4 inline" />
										<span>{order.customer.email}</span>
									</ItemDescription>
								</ItemContent>
							</Item>
							<Item variant="muted">
								<ItemHeader>Địa Chỉ Giao Hàng</ItemHeader>
								<ItemContent>
									<ItemTitle>
										{order.customer.address.street},
										{order.customer.address.ward.label},
										{order.customer.address.district.label},
										{order.customer.address.province.label}
									</ItemTitle>
								</ItemContent>
							</Item>
						</CardContent>
					</Card>
				</div>
				{/*<Card className="border-0 shadow-none lg:col-span-4 h-fit">
					<CardHeader>
						<CardTitle>Thông tin đơn hàng</CardTitle>
					</CardHeader>
					<CardContent className="text-neutral-600 text-sm space-y-2">
						<div className="flex justify-between mb-4">
							<p>Tạm tính</p>
							<p>{formatVND(order.total_price)}</p>
						</div>
						<div className="flex justify-between">
							<p>Giảm giá</p>
							<p>{formatVND(order.total_discount)}</p>
						</div>
						<div className="flex justify-between">
							<p>Phí giao hàng</p>
							<p>Miễn phí</p>
						</div>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-between">
						<p className="font-bold">Thành tiền</p>
						<p className="font-bold text-lg">{formatVND(order.final_price)}</p>
					</CardFooter>
				</Card>*/}
			</CardContent>
		</Card>
	);
}
