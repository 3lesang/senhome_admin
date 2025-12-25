import { createFileRoute, redirect } from "@tanstack/react-router";
import DashboardLayout from "@/components/layout/dashboard";
import { getCountOrderQueryOptions } from "@/queries/order";

export const Route = createFileRoute("/(app)")({
	component: DashboardLayout,
	beforeLoad: async ({ context }) => {
		const token = localStorage.getItem("token");
		if (!token) {
			throw redirect({
				to: "/signin",
			});
		}
		return context.queryClient?.ensureQueryData(getCountOrderQueryOptions());
	},
});
