import { useQuery } from "@tanstack/react-query";
import type { VariantProps } from "class-variance-authority";
import { ChevronDownIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { ORDER_STATUS } from "@/app/order/constants";
import { getListItemOrderQueryOptions } from "@/app/order/handler/query/items";
import type { OrderDataType } from "@/app/order/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { formatVND } from "@/lib/utils";

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
						<TableCell className="h-14">{data.id}</TableCell>
						<TableCell className="h-14">
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
								<div className="size-10 rounded-md bg-gray-50">
									<img
										src={item.thumbnail}
										alt=""
										className="w-full object-cover"
									/>
								</div>
								<div className="space-y-1">
									<div>
										<span className="mr-8">{item.name}</span>
										<span>{formatVND(item.price)}</span>
									</div>
									<div className="space-x-2">
										{item.variant.map((v) => (
											<Badge key={v} variant="secondary">
												{v}
											</Badge>
										))}
										<Badge variant="secondary">Số lượng {item.quantity}</Badge>
									</div>
								</div>
							</div>
						</TableCell>
					</TableRow>
				))}
		</React.Fragment>
	);
}
