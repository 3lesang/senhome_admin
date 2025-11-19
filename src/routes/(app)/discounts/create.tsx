import { DiscountCreatePage } from "@/pages/discount/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/discounts/create")({
  component: DiscountCreatePage,
});
