import { createFileRoute } from "@tanstack/react-router";
import ProductListPage from "@/app/product/pages/list";

export const Route = createFileRoute("/(app)/product/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ProductListPage />;
}
