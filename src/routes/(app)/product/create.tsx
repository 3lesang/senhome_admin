import ProductCreatePage from "@/features/product/pages/product-create-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductCreatePage />;
}
