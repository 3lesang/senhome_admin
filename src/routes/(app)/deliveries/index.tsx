import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { DeliveryListPage } from "@/pages/delivery/list";
import { getShippingFeesQueryOptions } from "@/queries/shipping-fee";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
});

export const Route = createFileRoute("/(app)/deliveries/")({
	component: DeliveryListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps }) => {
		return context.queryClient?.ensureQueryData(
			getShippingFeesQueryOptions(deps),
		);
	},
});
