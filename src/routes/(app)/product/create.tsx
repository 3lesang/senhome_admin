import { createFileRoute } from "@tanstack/react-router";
import ProductCreatePage from "@/pages/product/create";

export const Route = createFileRoute("/(app)/product/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ProductCreatePage />;
}
