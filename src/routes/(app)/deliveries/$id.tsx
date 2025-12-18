import { createFileRoute } from "@tanstack/react-router";
import { DeliveryUpdatePage } from "@/pages/delivery/update";
import { getShippingFeeQueryOptions } from "@/queries/shipping-fee";

export const Route = createFileRoute("/(app)/deliveries/$id")({
	component: DeliveryUpdatePage,
	loader({ context, params }) {
		return context.queryClient?.ensureQueryData(
			getShippingFeeQueryOptions(params.id),
		);
	},
});
