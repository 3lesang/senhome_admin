import { createFileRoute } from "@tanstack/react-router";
import { getOneStorePageQueryOptions } from "@/handlers/store/query/page/one";
import StorePageUpdatePage from "@/pages/store/pages/update";

export const Route = createFileRoute("/(app)/store/pages/$id")({
	component: StorePageUpdatePage,
	loader: async ({ context, params }) => {
		const { id } = params;
		return context.queryClient?.ensureQueryData(
			getOneStorePageQueryOptions(id),
		);
	},
});
