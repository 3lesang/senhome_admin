import ProductListPage from "@/features/product/pages/list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductListPage />;
}
