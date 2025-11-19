import { CustomerListPage } from "@/pages/customer/list";
import { getCustomersQueryOptions } from "@/queries/customer";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

export const Route = createFileRoute("/(app)/customers/")({
  component: CustomerListPage,
  validateSearch: schema,
  loader: ({ context }) => {
    return context.queryClient?.ensureQueryData(getCustomersQueryOptions());
  },
});
