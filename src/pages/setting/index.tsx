import { Link } from "@tanstack/react-router";
import {
	CreditCardIcon,
	SettingsIcon,
	ShoppingCartIcon,
	TruckIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StoreSettingsPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Cấu hình</CardTitle>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardContent className="grid grid-cols-12 gap-4">
						<Link
							to="/store/setting/general"
							className={cn(
								buttonVariants({ variant: "ghost", size: "lg" }),
								"col-span-4 justify-start h-16",
							)}
						>
							<SettingsIcon />
							<div>
								<p>Cấu hình chung</p>
								<p className="text-xs text-gray-500">
									Quản lý thông tin cửa hàng
								</p>
							</div>
						</Link>
						<Link
							to="/store/setting/checkouts"
							className={cn(
								buttonVariants({ variant: "ghost", size: "lg" }),
								"col-span-4 justify-start h-16",
							)}
						>
							<ShoppingCartIcon />
							<div>
								<p>Thanh toán</p>
								<p className="text-xs text-gray-500">
									Quản lý, cấu hình thanh toán
								</p>
							</div>
						</Link>
						<Link
							to="/store/setting/shipments"
							className={cn(
								buttonVariants({ variant: "ghost", size: "lg" }),
								"col-span-4 justify-start h-16",
							)}
						>
							<TruckIcon />
							<div>
								<p>Vận chuyển</p>
								<p className="text-xs text-gray-500">
									Quản lý, cấu hình vận chuyển
								</p>
							</div>
						</Link>
						<Link
							to="/store/setting/payments"
							className={cn(
								buttonVariants({ variant: "ghost", size: "lg" }),
								"col-span-4 justify-start h-16",
							)}
						>
							<CreditCardIcon />
							<div>
								<p>Phương thức thanh toán</p>
								<p className="text-xs text-gray-500">
									Quản lý, cấu hình phương thức thanh toán
								</p>
							</div>
						</Link>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
