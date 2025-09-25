import { SidebarContent } from "@/components/ui/sidebar";
import ManageMenuGroup from "./manage";
import OverviewMenuGroup from "./overview";
import StoreMenuGroup from "./store";

export default function ContentSidebar() {
	return (
		<SidebarContent>
			<OverviewMenuGroup />
			<ManageMenuGroup />
			<StoreMenuGroup />
		</SidebarContent>
	);
}
