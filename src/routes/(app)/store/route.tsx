import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { SettingsIcon, ShieldIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/(app)/store")({
	component: RouteComponent,
});

function RouteComponent() {
	const location = useLocation();
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý cửa hàng</CardTitle>
				<CardDescription>Cập nhật thông tin cửa hàng</CardDescription>
			</CardHeader>
			<SidebarProvider className="items-start min-h-fit">
				<Sidebar collapsible="none" className="hidden md:flex">
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive={location.pathname === "/store/general"}
										>
											<Link to="/store/general">
												<SettingsIcon />
												<span>Thông tin chung</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarGroup>
							<SidebarGroupLabel className="select-none">
								Chính sách
							</SidebarGroupLabel>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={location.pathname === "/store/policy"}
									>
										<Link to="/store/policy">
											<ShieldIcon />
											<span>Chính sách</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<main className="flex flex-1 flex-col">
					<Outlet />
				</main>
			</SidebarProvider>
		</Card>
	);
}
