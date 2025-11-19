import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { OrderListPage } from "@/pages/order/list";
import { getOrdersQueryOptions } from "@/queries/order";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/orders/")({
	component: OrderListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context }) {
		return context.queryClient?.ensureQueryData(getOrdersQueryOptions());
	},
});
