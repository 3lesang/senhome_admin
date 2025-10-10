import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListOrderQueryOptions } from "@/api/order/list";
import { OrderListPage } from "@/pages/order/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/orders/")({
	component: OrderListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(getListOrderQueryOptions(deps));
	},
});
