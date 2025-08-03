import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  ChartPieIcon,
  ClipboardListIcon,
  GalleryVerticalEnd,
  Home,
  LayoutGridIcon,
  PackageIcon,
  UserCircleIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
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
});

function RouteComponent() {
  const routerState = useRouterState();
  const currentPathname = routerState.location.pathname;

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
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <GalleryVerticalEnd className="size-4" />
            <span className="truncate font-medium">Senhome</span>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Home</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  asChild
                  isActive={currentPathname == "/"}
                >
                  <Link to="/">
                    <ChartPieIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Product"
                  asChild
                  isActive={currentPathname == "/product"}
                >
                  <Link to="/product">
                    <PackageIcon />
                    <span>Product</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Category"
                  asChild
                  isActive={currentPathname == "/category"}
                >
                  <Link to="/category">
                    <LayoutGridIcon />
                    <span>Category</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Order"
                  asChild
                  isActive={currentPathname == "/order"}
                >
                  <Link to="/order">
                    <ClipboardListIcon />
                    <span>Order</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser
            user={{
              name: "Sang Le",
              email: "3lesang@gmail.com",
              avatar: "https://github.com/shadcn.png",
            }}
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
