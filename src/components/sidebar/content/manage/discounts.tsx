import { Link, useLocation } from "@tanstack/react-router";
import { PercentIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export default function DiscountMenu() {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <Link to="/discounts">
        <SidebarMenuButton isActive={location.pathname.includes("/discounts")}>
          <PercentIcon />
          <span className="select-none">Khuyến mãi</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
