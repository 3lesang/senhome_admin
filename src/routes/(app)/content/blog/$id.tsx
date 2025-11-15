import { BlogUpdatePage } from "@/pages/blog/update";
import {
  getPostContentQueryOptions,
  getPostQueryOptions,
} from "@/queries/post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/content/blog/$id")({
  component: BlogUpdatePage,
  loader: async ({ context, params }) => {
    await context.queryClient?.ensureQueryData(getPostQueryOptions(params.id));
    return context.queryClient?.ensureQueryData(
      getPostContentQueryOptions(params.id),
    );
  },
});
