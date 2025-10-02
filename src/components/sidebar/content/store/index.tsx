import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
} from "@/components/ui/sidebar";
import WebsiteMenu from "./website";

export default function StoreMenuGroup() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="select-none">
				Kênh bán hàng
			</SidebarGroupLabel>
			<SidebarMenu>
				<WebsiteMenu />
			</SidebarMenu>
		</SidebarGroup>
	);
}
