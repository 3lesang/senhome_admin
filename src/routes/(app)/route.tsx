import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "@/components/layout/dashboard";

export const Route = createFileRoute("/(app)")({
	component: DashboardLayout,
	beforeLoad: async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			throw redirect({
				to: "/signin",
			});
		}
	},
});
