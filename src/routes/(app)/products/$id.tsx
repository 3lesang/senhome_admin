import { createFileRoute } from "@tanstack/react-router";
import { getCollectionsProductQueryOptions } from "@/api/collection/query/list";
import { getOptionsProductQueryOptions } from "@/api/option/query/list";
import { productQueryOptions } from "@/api/product/query/one";
import { getVariantsProductQueryOptions } from "@/api/variant/query/list";
import { ProductUpdatePage } from "@/pages/product/update";

export const Route = createFileRoute("/(app)/products/$id")({
	component: ProductUpdatePage,
	async loader({ context, params }) {
		const id = params.id;
		await context.queryClient?.ensureQueryData(
			getOptionsProductQueryOptions(id),
		);
		await context.queryClient?.ensureQueryData(
			getVariantsProductQueryOptions(id),
		);
		await context.queryClient?.ensureQueryData(
			getCollectionsProductQueryOptions(id),
		);
		return context.queryClient?.ensureQueryData(productQueryOptions(id));
	},
});
