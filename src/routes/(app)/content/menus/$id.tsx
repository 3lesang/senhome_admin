import { createFileRoute } from "@tanstack/react-router";
import { getOneMenuQueryOptions } from "@/handlers/menu/query/one";
import UpdateMenuPage from "@/pages/content/menu/update";

export const Route = createFileRoute("/(app)/content/menus/$id")({
	component: UpdateMenuPage,
	loader: ({ context, params }) => {
		return context.queryClient?.ensureQueryData(
			getOneMenuQueryOptions(params.id),
		);
	},
});
