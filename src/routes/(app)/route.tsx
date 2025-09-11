import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import {
  ClipboardListIcon,
  Home,
  PackageIcon,
  UserCircleIcon,
} from "lucide-react";

import AppSidebar from "@/components/layout/app-sidebar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import pocketClient from "@/pocketbase/client";
import { cn } from "@/lib/utils";

const navigationMenuItems = [
  { title: "Home", href: "/", icon: Home, isActive: true },
  { title: "Product", href: "/product", icon: PackageIcon },
  { title: "Order", href: "/order", icon: ClipboardListIcon },
  { title: "Account", href: "#account", icon: UserCircleIcon },
];

export default function NavigationMenuMobile() {
  return (
    <NavigationMenu className="max-w-full bg-white">
      <NavigationMenuList>
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "flex flex-col h-auto items-center px-5 py-2.5"
              )}
              active={item.isActive}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="mb-1.5 h-5 w-5" />
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!pocketClient.authStore.isValid) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

function RouteComponent() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <div className="h-[calc(100vh-66px)] overflow-auto no-scrollbar">
          <Outlet />
        </div>
        <NavigationMenuMobile />
      </>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gray-50">
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
