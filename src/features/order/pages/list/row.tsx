import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TableCell, TableRow } from "@/components/ui/table";
import { ORDER_STATUS } from "@/features/order/constants";
import { getListItemOrderQueryOptions } from "@/features/order/handler/query/items";
import type { OrderDataType } from "@/features/order/types";
import { formatVND } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface PageListTableRowProps {
  data: OrderDataType;
}

type OrderStatus = typeof ORDER_STATUS;
type OrderStatusKey = keyof OrderStatus;

function PageListTableRow({ data }: PageListTableRowProps) {
  const { id } = data;
  const { data: itemData } = useQuery(getListItemOrderQueryOptions(id));

  const status = ORDER_STATUS[data.status as OrderStatusKey];
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <>
          <TableRow>
            <TableCell>
              <Checkbox />
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
              <Badge variant="secondary" className={status.class}>
                {status.label}
              </Badge>
            </TableCell>
          </TableRow>
          {itemData?.map((item) => (
            <TableRow key={item.id}>
              <TableCell colSpan={6}>
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
                      {item.variant.map((v, index) => (
                        <Badge key={index} variant="secondary">
                          {v}
                        </Badge>
                      ))}
                      <Badge>Số lượng {item.quantity}</Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}

export default PageListTableRow;
