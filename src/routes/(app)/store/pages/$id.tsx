import { createFileRoute } from "@tanstack/react-router";
import { getOneStorePageQueryOptions } from "@/api/page/query/one";
import { StorePageUpdatePage } from "@/pages/pages/update";

export const Route = createFileRoute("/(app)/store/pages/$id")({
	component: StorePageUpdatePage,
	loader: async ({ context, params }) => {
		const { id } = params;
		return context.queryClient?.ensureQueryData(
			getOneStorePageQueryOptions(id),
		);
	},
});
