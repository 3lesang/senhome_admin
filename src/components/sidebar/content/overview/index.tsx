import { Link, useLocation } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function OverviewMenuGroup() {
	const location = useLocation();
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="select-none">Tổng quan</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<Link to="/">
						<SidebarMenuButton isActive={location.pathname === "/"}>
							<HomeIcon />
							<span className="select-none">Trang chủ</span>
						</SidebarMenuButton>
					</Link>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
