import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListOrderQueryOptions } from "@/handlers/order/query/list";
import OrderListPage from "@/pages/order/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/orders/")({
	component: OrderListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getListOrderQueryOptions({ page, limit, query: q }),
		);
	},
});
