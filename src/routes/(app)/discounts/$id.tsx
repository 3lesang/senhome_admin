import { DiscountUpdatePage } from "@/pages/discount/update";
import { getDiscountQueryOptions } from "@/queries/discount";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/discounts/$id")({
  component: DiscountUpdatePage,
  loader: ({ context, params }) => {
    return context.queryClient?.ensureQueryData(
      getDiscountQueryOptions(params.id),
    );
  },
});
