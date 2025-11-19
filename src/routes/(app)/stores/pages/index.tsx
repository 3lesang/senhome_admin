import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { PageStoreListPage } from "@/pages/page/list";
import { getPagesQueryOptions } from "@/queries/page";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/stores/pages/")({
  component: PageStoreListPage,
  validateSearch: schema,
  loaderDeps: ({ search }) => search,
  loader({ context, deps }) {
    return context.queryClient?.ensureQueryData(getPagesQueryOptions(deps));
  },
});
