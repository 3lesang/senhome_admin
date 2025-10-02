import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import AnalyticsMenu from "./analytics";
import ContentMenu from "./content";
import CustomersMenu from "./customers";
import DiscountMenu from "./discounts";
import OrderMenu from "./order";
import ProductMenu from "./product";

export default function ManageMenuGroup() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="select-none">Quản lý</SidebarGroupLabel>
			<SidebarMenu>
				<ProductMenu />
				<OrderMenu />
				<CustomersMenu />
				<DiscountMenu />
				<ContentMenu />
				<AnalyticsMenu />
			</SidebarMenu>
		</SidebarGroup>
	);
}
