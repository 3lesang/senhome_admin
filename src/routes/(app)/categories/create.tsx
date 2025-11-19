import { CategoryCreatePage } from "@/pages/category/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/categories/create")({
  component: CategoryCreatePage,
});
