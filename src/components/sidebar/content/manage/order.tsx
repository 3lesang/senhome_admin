import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingCartIcon } from "lucide-react";
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
import { getCountOrderQueryOptions } from "@/queries/order";

export default function OrderMenu() {
	const location = useLocation();
	const getCountOrdersQuery = useSuspenseQuery(getCountOrderQueryOptions());
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
							<span>({getCountOrdersQuery.data.data.pending_count})</span>
						</SidebarMenuButton>
					</Link>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
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
