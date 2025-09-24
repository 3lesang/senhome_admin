import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListProductQueryOptions } from "@/handlers/product/query/list";
import ProductListPage from "@/pages/product/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/")({
	validateSearch: schema,
	component: ProductListPage,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getListProductQueryOptions({ page, limit, query: q }),
		);
	},
});
