import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { CategoryListPage } from "@/pages/category/list";
import { getCategoriesQueryOptions } from "@/queries/category";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

export const Route = createFileRoute("/(app)/categories/")({
  component: CategoryListPage,
  validateSearch: schema,
  loaderDeps: ({ search }) => search,
  loader({ context, deps }) {
    return context.queryClient?.ensureQueryData(
      getCategoriesQueryOptions(deps),
    );
  },
});
