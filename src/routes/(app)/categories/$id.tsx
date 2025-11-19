import { CategoryUpdatePage } from "@/pages/category/update";
import { getCategoryQueryOptions } from "@/queries/category";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/categories/$id")({
  component: CategoryUpdatePage,
  loader: ({ context, params }) => {
    return context.queryClient?.ensureQueryData(
      getCategoryQueryOptions(params.id),
    );
  },
});
