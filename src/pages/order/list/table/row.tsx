import { useQuery } from "@tanstack/react-query";
import type { VariantProps } from "class-variance-authority";
import { ChevronDownIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, type badgeVariants } from "@/components/ui/badge";
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
import { ORDER_STATUS } from "@/constants/order";
import { getListItemOrderQueryOptions } from "@/handlers/order/query/items";
import { formatVND } from "@/lib/utils";
import type { OrderDataType } from "@/types/order";

interface PageListTableRowProps {
	data: OrderDataType;
}

type OrderStatus = typeof ORDER_STATUS;
type OrderStatusKey = keyof OrderStatus;
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export default function PageListTableRow({ data }: PageListTableRowProps) {
	const [expand, setExpand] = useState(false);
	const { id } = data;
	const { data: itemData } = useQuery(getListItemOrderQueryOptions(id));

	const status = ORDER_STATUS[data.status as OrderStatusKey];

	const statusVariant: Record<number, BadgeVariant> = {
		0: "outline",
		1: "default",
		2: "secondary",
	};

	return (
		<React.Fragment>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow className="group">
						<TableCell>
							<div className="flex items-center gap-1">
								<Button
									variant="ghost"
									className="size-6 opacity-0 group-hover:opacity-100"
									onClick={() => setExpand((prev) => !prev)}
								>
									<ChevronDownIcon />
								</Button>
								<Checkbox />
							</div>
						</TableCell>
						<TableCell>{data.id}</TableCell>
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
						<TableCell>{data?.shipping_address}</TableCell>
						<TableCell>{formatVND(data.final_price)}</TableCell>
						<TableCell>
							<Badge variant={statusVariant[status.variant]}>
								{status.label}
							</Badge>
						</TableCell>
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
						<TableCell colSpan={5}>
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
