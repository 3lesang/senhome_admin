import { createFileRoute } from "@tanstack/react-router";
import { UpdateMenuPage } from "@/pages/menu/update";
import { getMenuItemQueryOptions, getMenuQueryOptions } from "@/queries/menu";

export const Route = createFileRoute("/(app)/store/menu/$id")({
  component: UpdateMenuPage,
  loader: async ({ context, params }) => {
    await context.queryClient?.ensureQueryData(
      getMenuItemQueryOptions(params.id),
    );
    return context.queryClient?.ensureQueryData(getMenuQueryOptions(params.id));
  },
});
