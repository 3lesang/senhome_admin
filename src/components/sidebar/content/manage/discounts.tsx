import { Link, useLocation } from "@tanstack/react-router";
import { PercentIcon } from "lucide-react";
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

export default function DiscountMenu() {
	const location = useLocation();
	return (
		<Collapsible
			asChild
			className="group/collapsible"
			open={location.href.includes("/discounts")}
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<Link to="/discounts/coupons">
						<SidebarMenuButton>
							<PercentIcon />
							<span className="select-none">Khuyến mãi</span>
						</SidebarMenuButton>
					</Link>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="border-l-0">
						<SidebarMenuSubItem>
							<Link to="/discounts/coupons">
								<SidebarMenuSubButton
									isActive={location.pathname === "/discounts/coupons"}
								>
									<span className="select-none">Coupons</span>
								</SidebarMenuSubButton>
							</Link>
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<Link to="/discounts/promotions">
								<SidebarMenuSubButton
									isActive={location.pathname === "/discounts/promotions"}
								>
									<span className="select-none">Promotions</span>
								</SidebarMenuSubButton>
							</Link>
						</SidebarMenuSubItem>
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}
