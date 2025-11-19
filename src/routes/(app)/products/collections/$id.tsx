import { createFileRoute } from "@tanstack/react-router";
import { CollectionUpdatePage } from "@/pages/collection/update";
import { getCollectionQueryOptions } from "@/queries/collection";

export const Route = createFileRoute("/(app)/products/collections/$id")({
	component: CollectionUpdatePage,
	loader: async ({ context, params }) => {
		return context.queryClient?.ensureQueryData(
			getCollectionQueryOptions(params.id),
		)
	},
});
