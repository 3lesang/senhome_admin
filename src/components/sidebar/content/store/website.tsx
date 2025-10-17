import { Link, useLocation } from "@tanstack/react-router";
import { EyeIcon, GlobeIcon } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

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
					<SidebarMenuButton asChild>
						<Link to="/store/pages">
							<GlobeIcon />
							<span className="select-none">Website</span>
						</Link>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="border-l-0">
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname.includes("/store/pages")}
							>
								<Link to="/store/pages">
									<span className="select-none">Trang nội dung</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname.includes("/store/menus")}
							>
								<Link to="/store/menus">
									<span className="select-none">Menu</span>
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
				<SidebarMenuAction>
					<Tooltip>
						<TooltipTrigger>
							<a
								href="https://web-dev.senhome.vn"
								target="_blank"
								rel="noopener"
							>
								<EyeIcon size={16} />
							</a>
						</TooltipTrigger>
						<TooltipContent>
							<p>View store</p>
						</TooltipContent>
					</Tooltip>
				</SidebarMenuAction>
			</SidebarMenuItem>
		</Collapsible>
	);
}
