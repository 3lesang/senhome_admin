import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import OrderContent from "./content";

export default function OrderListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý đơn hàng</CardTitle>
				<CardDescription>Danh sách đơn hàng</CardDescription>
				<CardAction className="flex gap-2 items-center">
					<Button variant="outline">Xuất dữ liệu</Button>
					<Button>
						<PlusIcon />
						Tạo đơn hàng
					</Button>
				</CardAction>
			</CardHeader>
			<OrderContent />
		</Card>
	);
}
