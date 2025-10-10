import { createFileRoute } from "@tanstack/react-router";
import { getOneMenuQueryOptions } from "@/api/menu/one";
import { UpdateMenuPage } from "@/pages/menu/update";

export const Route = createFileRoute("/(app)/store/menus/$id")({
	component: UpdateMenuPage,
	loader: ({ context, params }) => {
		return context.queryClient?.ensureQueryData(
			getOneMenuQueryOptions(params.id),
		);
	},
});
