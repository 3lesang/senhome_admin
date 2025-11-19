import { Link, useLocation } from "@tanstack/react-router";
import { GlobeIcon } from "lucide-react";
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

export default function WebsiteMenu() {
  const location = useLocation();
  return (
    <Collapsible
      asChild
      className="group/collapsible"
      open={location.href.includes("/stores")}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <Link to="/stores/pages">
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
                isActive={location.pathname.includes("/stores/pages")}
              >
                <Link to="/stores/pages">
                  <span className="select-none">Trang nội dung</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                asChild
                isActive={location.pathname.includes("/stores/menus")}
              >
                <Link to="/stores/menus">
                  <span className="select-none">Menu</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                asChild
                isActive={location.pathname.includes("/stores/settings")}
              >
                <Link to="/stores/settings/general">
                  <span className="select-none">Cấu hình</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
