import { BlogUpdatePage } from "@/pages/blog/update";
import {
  getPostContentQueryOptions,
  getPostQueryOptions,
} from "@/queries/post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/contents/blogs/$id")({
  component: BlogUpdatePage,
  loader: async ({ context, params }) => {
    const post = await context.queryClient?.ensureQueryData(getPostQueryOptions(params.id));
    return context.queryClient?.ensureQueryData(
      getPostContentQueryOptions(post?.data.slug ?? ""),
    );
  },
});
