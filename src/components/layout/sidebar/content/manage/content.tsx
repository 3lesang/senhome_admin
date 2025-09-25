import { Link, useLocation } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
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

export default function ContentMenu() {
	const location = useLocation();
	return (
		<Collapsible
			asChild
			className="group/collapsible"
			open={location.href.includes("/content")}
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<Link to="/content/articles">
						<SidebarMenuButton>
							<ImageIcon />
							<span className="select-none">Nội dung</span>
						</SidebarMenuButton>
					</Link>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="border-l-0">
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname === "/content/articles"}
							>
								<Link to="/content/articles">
									<span className="select-none">Bài viết Blogs</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname === "/content/files"}
							>
								<Link to="/content/files">
									<span className="select-none">Files</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
						<SidebarMenuSubItem>
							<SidebarMenuSubButton
								asChild
								isActive={location.pathname === "/content/menus"}
							>
								<Link to="/content/menus">
									<span className="select-none">Menu</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuSubItem>
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}
