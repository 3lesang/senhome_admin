import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { getListItemOrderQueryOptions } from "@/handlers/order/query/items";
import { formatRelativeDate, formatVND } from "@/lib/utils";
import type { OrderDataType } from "@/types/order";

interface OrderRowProps {
	data: OrderDataType;
}

export default function OrderRow({ data }: OrderRowProps) {
	const [expand, setExpand] = useState(false);
	const { id } = data;
	const { data: itemData } = useQuery(getListItemOrderQueryOptions(id));

	return (
		<React.Fragment>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow className="group">
						<TableCell className="w-16">
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									className="size-6"
									onClick={() => setExpand((prev) => !prev)}
								>
									<ChevronRightIcon />
								</Button>
								<Checkbox />
							</div>
						</TableCell>
						<TableCell>{data.id}</TableCell>
						<TableCell>{formatRelativeDate(new Date(data.created))}</TableCell>
						<TableCell>
							<HoverCard>
								<HoverCardTrigger asChild>
									<Badge variant="secondary" className="cursor-pointer">
										{data.name}
									</Badge>
								</HoverCardTrigger>
								<HoverCardContent>
									<div className="flex justify-between gap-2">
										<Avatar>
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
										<div className="space-y-1">
											<h4 className="text-sm font-semibold">{data.name}</h4>
											<p className="text-sm">{data.email}</p>
											<div className="text-muted-foreground text-xs">
												{data.phone}
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
						</TableCell>
						<TableCell>
							<Badge variant="secondary">
								Chờ xử lý
							</Badge>
						</TableCell>
						<TableCell>
							<Badge variant="outline">Chưa giao hàng</Badge>
						</TableCell>
						<TableCell>{formatVND(data.final_price)}</TableCell>
					</TableRow>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>
						<Trash2Icon />
						Xóa
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			{expand &&
				itemData?.map((item) => (
					<TableRow key={item.id}>
						<TableCell></TableCell>
						<TableCell colSpan={6}>
							<div className="flex items-center gap-1">
								<Avatar className="rounded size-6">
									<AvatarImage src={item.thumbnail} />
									<AvatarFallback className="rounded"></AvatarFallback>
								</Avatar>
								<div className="space-x-1">
									<span>{item.name}</span>
									{item.variant.map((v) => (
										<Badge key={v} variant="secondary">
											{v}
										</Badge>
									))}
									<Badge variant="secondary">Số lượng {item.quantity}</Badge>
									<span>{formatVND(item.price)}</span>
								</div>
							</div>
						</TableCell>
					</TableRow>
				))}
		</React.Fragment>
	);
}
