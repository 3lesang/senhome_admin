import { StorePageUpdatePage } from "@/pages/page/update";
import {
  getPageContentQueryOptions,
  getPageQueryOptions,
} from "@/queries/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/store/page/$id")({
  component: StorePageUpdatePage,
  loader: async ({ context, params }) => {
    await context.queryClient?.ensureQueryData(
      getPageContentQueryOptions(params.id),
    );
    return context.queryClient?.ensureQueryData(getPageQueryOptions(params.id));
  },
});
