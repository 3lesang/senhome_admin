import { GalleryVerticalEndIcon } from "lucide-react";
import { SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar";

export default function HeaderSidebar() {
	return (
		<SidebarHeader>
			<SidebarMenuButton size="lg">
				<GalleryVerticalEndIcon />
				<div className="grid flex-1 text-left text-sm leading-tight select-none">
					<span className="truncate font-medium">Senhome</span>
					<span className="truncate text-xs">Enterprise</span>
				</div>
			</SidebarMenuButton>
		</SidebarHeader>
	);
}
