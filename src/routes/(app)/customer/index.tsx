import { CustomerListPage } from "@/pages/customer/list";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const schema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
});

export const Route = createFileRoute("/(app)/customer/")({
  component: CustomerListPage,
  validateSearch: schema,
});
