import { BlogListPage } from "@/pages/blog/list";
import { getPostsQueryOptions } from "@/queries/post";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

export const Route = createFileRoute("/(app)/content/blog/")({
  validateSearch: schema,
  loaderDeps: ({ search }) => search,
  component: BlogListPage,
  loader: ({ context, deps }) => {
    return context.queryClient?.ensureQueryData(getPostsQueryOptions(deps));
  },
});
