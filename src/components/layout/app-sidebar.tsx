import { Link, useLocation } from "@tanstack/react-router";
import {
	BellIcon,
	ChartColumnIcon,
	GalleryVerticalEnd,
	GlobeIcon,
	LogOutIcon,
	MoreVerticalIcon,
	ShoppingCartIcon,
	TagIcon,
	UserCircleIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import pocketClient from "@/pocketbase/client";
import SettingsDialog from "../settings-dialog";
import { Badge } from "../ui/badge";

export default function AppSidebar() {
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
						<Collapsible
							asChild
							className="group/collapsible"
							open={location.href.includes("/products")}
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<Link to="/products">
										<SidebarMenuButton>
											<TagIcon />
											<span className="select-none">Sản phẩm</span>
										</SidebarMenuButton>
									</Link>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub className="border-l-0">
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/products"}
											>
												<Link to="/products">
													<span className="select-none">Tất cả sản phẩm</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/products/collections"}
											>
												<Link to="/products/collections">
													<span className="select-none">Nhóm sản phẩm</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/products/create"}
											>
												<Link to="/products/create">
													<span className="select-none">Tạo sản phẩm</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
						<Collapsible
							asChild
							className="group/collapsible"
							open={location.href.includes("/orders")}
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<Link to="/orders">
										<SidebarMenuButton>
											<ShoppingCartIcon />
											<span className="select-none">Đơn hàng</span>
											<Badge variant="secondary" className="ml-auto">
												10
											</Badge>
										</SidebarMenuButton>
									</Link>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub className="border-l-0">
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/orders"}
											>
												<Link to="/orders">
													<span className="select-none">Tất cả đơn hàng</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.href === "/orders/draft"}
											>
												<Link to="/orders/draft">
													<span className="select-none">Đơn hàng nháp</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
						<Collapsible
							asChild
							className="group/collapsible"
							open={location.href.includes("/analytics")}
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<Link to="/analytics">
										<SidebarMenuButton>
											<ChartColumnIcon />
											<span className="select-none">Báo cáo</span>
										</SidebarMenuButton>
									</Link>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub className="border-l-0">
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/analytics"}
											>
												<Link to="/analytics">
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
						Kênh bán hàng
					</SidebarGroupLabel>
					<SidebarMenu>
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
												isActive={location.pathname === "/store/files"}
											>
												<Link to="/store/files">
													<span className="select-none">File</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/store/menus"}
											>
												<Link to="/store/menus">
													<span className="select-none">Menu</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<SidebarMenuSubButton
												asChild
												isActive={location.pathname === "/store/settings"}
											>
												<Link to="/store/settings">
													<span className="select-none">Cấu hình</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SettingsDialog />
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
