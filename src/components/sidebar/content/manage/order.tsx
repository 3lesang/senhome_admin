import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ORDER_COLLECTION, pocketClient } from "@/pocketbase";

export default function OrderMenu() {
	const location = useLocation();
	const { data } = useQuery({
		queryKey: [ORDER_COLLECTION, "count"],
		queryFn: () => {
			return pocketClient.collection(ORDER_COLLECTION).getList(1, 1);
		},
	});
	return (
		<Collapsible
			asChild
			className="group/collapsible"
			open={location.href.includes("/orders")}
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<Link to="/orders">
						<SidebarMenuButton>
							<ShoppingCartIcon />
							<span className="select-none">Đơn hàng</span>
							{Number(data?.totalItems) > 0 && (
								<Badge variant="secondary" className="ml-auto">
									{data?.totalItems}
								</Badge>
							)}
						</SidebarMenuButton>
					</Link>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="border-l-0">
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname === "/orders"}
							>
								<Link to="/orders">
									<span className="select-none">Tất cả đơn hàng</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.href === "/orders/draft"}
							>
								<Link to="/orders/draft">
									<span className="select-none">Đơn hàng nháp</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}
