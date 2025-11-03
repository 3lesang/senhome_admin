import { createFileRoute } from "@tanstack/react-router";
import { OneOrderPage } from "@/pages/order/one";
import { getOrderQueryOptions } from "@/queries/order";

export const Route = createFileRoute("/(app)/order/$id")({
	component: OneOrderPage,
	loader: async ({ context, params }) => {
		return context?.queryClient?.ensureQueryData(
			getOrderQueryOptions(params.id),
		);
	},
});
