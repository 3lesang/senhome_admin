import ProductCreatePage from "@/features/product/pages/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductCreatePage />;
}
