import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListProductQueryOptions } from "@/api/product/list";
import { ProductListPage } from "@/pages/product/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/")({
	validateSearch: schema,
	component: ProductListPage,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(
			getListProductQueryOptions(deps),
		);
	},
});
