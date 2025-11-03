import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { ProductListPage } from "@/pages/product/list";
import { getProductsQueryOptions } from "@/queries/product";

const schema = z.object({
	page: z.number().default(1),
	size: z.number().default(10),
});

export const Route = createFileRoute("/(app)/product/")({
	validateSearch: schema,
	component: ProductListPage,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(
			getProductsQueryOptions(deps),
		)
	},
});
