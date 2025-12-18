import { Link, useLocation } from "@tanstack/react-router";
import { PackageIcon, } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export default function DeliveryMenu() {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <Link to="/deliveries">
        <SidebarMenuButton isActive={location.pathname.includes("/deliveries")}>
          <PackageIcon />
          <span className="select-none">Vận chuyển</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
