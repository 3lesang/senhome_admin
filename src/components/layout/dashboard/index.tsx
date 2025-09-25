import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../sidebar";

export default function DashboardLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-sidebar">
				<main>
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
