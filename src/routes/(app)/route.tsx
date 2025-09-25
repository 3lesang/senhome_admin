import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "@/components/layout/dashboard";
import pocketClient from "@/pocketbase/client";

export const Route = createFileRoute("/(app)")({
	component: DashboardLayout,
	beforeLoad: async () => {
		if (!pocketClient.authStore.isValid) {
			throw redirect({
				to: "/signin",
			});
		}
	},
});
