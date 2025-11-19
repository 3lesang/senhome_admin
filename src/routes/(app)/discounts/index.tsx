import { DiscountListPage } from "@/pages/discount/list";
import { getDiscountsQueryOptions } from "@/queries/discount";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

export const Route = createFileRoute("/(app)/discounts/")({
  component: DiscountListPage,
  validateSearch: schema,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    return context.queryClient?.ensureQueryData(getDiscountsQueryOptions(deps));
  },
});
