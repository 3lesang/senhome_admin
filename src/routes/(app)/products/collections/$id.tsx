import { createFileRoute } from "@tanstack/react-router";
import { getOneCollectionQueryOptions } from "@/api/collection/one";
import { getProductsCollectionQueryOptions } from "@/api/product/list";
import { CollectionUpdatePage } from "@/pages/collection/update";

export const Route = createFileRoute("/(app)/products/collections/$id")({
	component: CollectionUpdatePage,
	loader: async ({ context, params }) => {
		const { id } = params;
		await context.queryClient?.ensureQueryData(
			getProductsCollectionQueryOptions(id),
		);
		return context.queryClient?.ensureQueryData(
			getOneCollectionQueryOptions(id),
		);
	},
});
