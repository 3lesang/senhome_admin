import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { MenuListPage } from "@/pages/menu/list";
import { getMenusQueryOptions } from "@/queries/menu";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/stores/menus/")({
  component: MenuListPage,
  validateSearch: schema,
  loaderDeps: ({ search: { page, limit, query } }) => ({ page, limit, query }),
  loader({ context, deps }) {
    return context.queryClient?.ensureQueryData(getMenusQueryOptions(deps));
  },
});
