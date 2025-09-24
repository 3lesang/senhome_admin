import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListOrderQueryOptions } from "@/handlers/order/query/list";
import OrderListPage from "@/pages/order/list";

const schema = z.object({
	q: z.string().optional(),
});

export const Route = createFileRoute("/(app)/orders/")({
	component: RouteComponent,
	validateSearch: schema,
	loader(ctx) {
		ctx.context.queryClient?.ensureQueryData(
			getListOrderQueryOptions({ page: 1, limit: 10, query: "" }),
		)
	},
});

function RouteComponent() {
	return <OrderListPage />;
}
