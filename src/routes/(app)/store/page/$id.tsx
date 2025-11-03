import { createFileRoute } from "@tanstack/react-router";
import { getOneStorePageQueryOptions } from "@/api/page/one";
import { StorePageUpdatePage } from "@/pages/page/update";

export const Route = createFileRoute("/(app)/store/page/$id")({
	component: StorePageUpdatePage,
	loader: async ({ context, params }) => {
		const { id } = params;
		return context.queryClient?.ensureQueryData(
			getOneStorePageQueryOptions(id),
		)
	},
});
