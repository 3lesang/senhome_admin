import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { MailIcon, PhoneIcon } from "lucide-react";
import TablePagination from "@/components/table/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatVND } from "@/lib/utils";
import { getOrderQueryOptions } from "@/queries/order";

export function OneOrderPage() {
  const { id } = useParams({ from: "/(app)/orders/$id" });
  const getOrderQuery = useSuspenseQuery(getOrderQueryOptions(id));

  return (
    <Card className="max-w-6xl mx-auto bg-transparent border-0 shadow-none">
      <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-8">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Sản phẩm</CardTitle>
              <CardDescription>
                <Badge variant="secondary"> sản phẩm</Badge>
              </CardDescription>
            </CardHeader>
            <Table>
              <TableHeader className="bg-sidebar">
                <TableRow>
                  <TableHead className="w-16 text-center">
                    <Checkbox />
                  </TableHead>
                  <TableHead></TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Giá </TableHead>
                  <TableHead>Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getOrderQuery.data.data.items.map((item) => (
                  <TableRow key={item.product_id}>
                    <TableCell className="w-16 text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="pl-6">
                      <Avatar className="rounded">
                        <AvatarImage />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <Link
                        to="/products/$id/update"
                        params={{ id: item.product_id.toString() }}
                        className="hover:underline line-clamp-1"
                      >
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-x-1">
                        {Object.values(item.options).map((item) => (
                          <Badge key={item} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell>
                      <span>{formatVND(item.sale_price)}</span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardFooter>
              <TablePagination
                total={getOrderQuery.data.data.items.length}
                page={1}
                limit={10}
              />
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-4 space-y-4">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Thông Tin Người Mua</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle>{getOrderQuery.data.data.full_name}</ItemTitle>
                  <ItemDescription className="space-x-2">
                    <PhoneIcon className="size-4 inline" />
                    <span>{getOrderQuery.data.data.phone}</span>
                    <MailIcon className="size-4 inline" />
                    {/*<span>{order.customer.email}</span>*/}
                  </ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="muted">
                <ItemHeader>Địa Chỉ Giao Hàng</ItemHeader>
                <ItemContent>
                  <ItemTitle>{getOrderQuery.data.data.address_line}</ItemTitle>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none lg:col-span-4 h-fit">
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="text-neutral-600 text-sm space-y-2">
              <div className="flex justify-between mb-4">
                {/*<p>Tạm tính</p>*/}
                {/*<p>{formatVND(order.total_price)}</p>*/}
              </div>
              <div className="flex justify-between">
                <p>Giảm giá</p>
                <p>{formatVND(getOrderQuery.data.data.discount_amount)}</p>
              </div>
              <div className="flex justify-between">
                <p>Phí giao hàng</p>
                <p>Miễn phí</p>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between">
              <p className="font-bold">Thành tiền</p>
              <p className="font-bold text-lg">
                {formatVND(getOrderQuery.data.data.total_amount)}
              </p>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
