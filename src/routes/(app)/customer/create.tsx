import { CustomerCreatePage } from "@/pages/customer/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customer/create")({
  component: CustomerCreatePage,
});
