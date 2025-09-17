import { createFileRoute } from "@tanstack/react-router";
import ProductListPage from "@/pages/product/list";

export const Route = createFileRoute("/(app)/product/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ProductListPage />;
}
