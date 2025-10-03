import { Outlet } from "@tanstack/react-router";
import AppSidebar from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-transparent">
				<main>
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
