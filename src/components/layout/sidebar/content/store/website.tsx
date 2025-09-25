import { Link, useLocation } from "@tanstack/react-router";
import { EyeIcon, GlobeIcon, MoreHorizontalIcon } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export default function WebsiteMenu() {
	const location = useLocation();
	return (
		<Collapsible
			asChild
			className="group/collapsible"
			open={location.href.includes("/store")}
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<Link to="/store/pages">
						<SidebarMenuButton>
							<GlobeIcon />
							<span className="select-none">Website</span>
						</SidebarMenuButton>
					</Link>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="border-l-0">
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname === "/store/pages"}
							>
								<Link to="/store/pages">
									<span className="select-none">Trang nội dung</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname.includes("/store/settings")}
							>
								<Link to="/store/settings">
									<span className="select-none">Cấu hình</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
					</SidebarMenuSub>
				</CollapsibleContent>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuAction showOnHover>
							<MoreHorizontalIcon />
							<span className="sr-only">More</span>
						</SidebarMenuAction>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-48">
						<DropdownMenuItem>
							<EyeIcon className="text-muted-foreground" />
							<span>Xem cửa hàng</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</Collapsible>
	);
}
