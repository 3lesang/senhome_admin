import {
  BellIcon,
  GalleryVerticalEnd,
  LogOutIcon,
  MoreVerticalIcon,
  SettingsIcon,
  UserCircleIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChartPieIcon,
  ClipboardListIcon,
  ImageIcon,
  PackageIcon,
} from "lucide-react";

import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import pocketClient from "@/lib/pocketbase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function AppSidebar() {
  const location = useLocation();
  const user = {
    name: pocketClient.authStore.record?.name,
    email: pocketClient.authStore.record?.email,
    avatar: "https://github.com/shadcn.png",
  };
  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <GalleryVerticalEnd />
          <div className="grid flex-1 text-left text-sm leading-tight select-none">
            <span className="truncate font-medium">Senhome</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="select-none">Quản lý</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible asChild className="group/collapsible" defaultOpen>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <PackageIcon />
                    <span className="select-none">Quản lý sản phẩm</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname == "/product"}
                      >
                        <Link to="/product">
                          <span className="select-none">Tất cả sản phẩm</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname == "/product/create"}
                      >
                        <Link to="/product/create">
                          <span className="select-none">Thêm sản phẩm</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <Collapsible asChild className="group/collapsible" defaultOpen>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <ClipboardListIcon />
                    <span className="select-none">Quản lý đơn hàng</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname.includes("order")}
                      >
                        <Link to="/order">
                          <span className="select-none">Tất cả</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <Collapsible asChild className="group/collapsible" defaultOpen>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <ChartPieIcon />
                    <span className="select-none">Dữ liệu</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname.includes("data")}
                      >
                        <Link to="/order">
                          <span className="select-none">
                            Phân tích bán hàng
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="select-none">
            Hệ thống
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname.includes("file")}
              >
                <Link to="/file">
                  <ImageIcon />
                  <span className="select-none">Lưu trữ</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SettingsIcon />
              <span className="select-none">Cài đặt</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <BellIcon />
              <span className="select-none">Thông báo</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="rounded-lg select-none">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium select-none">
                    {user.name}
                  </span>
                  <MoreVerticalIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuItem>
                  <UserCircleIcon />
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon />
                  <span className="select-none">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
