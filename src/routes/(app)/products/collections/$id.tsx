import { createFileRoute } from "@tanstack/react-router";
import { getOneCollectionQueryOptions } from "@/handlers/collection/query/one";
import { CollectionUpdatePage } from "@/pages/collection/update";

export const Route = createFileRoute("/(app)/products/collections/$id")({
	component: CollectionUpdatePage,
	loader: async ({ context, params }) => {
		const { id } = params;
		return context.queryClient?.ensureQueryData(
			getOneCollectionQueryOptions(id),
		);
	},
});
