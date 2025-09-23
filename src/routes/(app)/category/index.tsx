import { createFileRoute } from "@tanstack/react-router";
import CategoryListPage from "@/pages/category/list";

export const Route = createFileRoute("/(app)/category/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CategoryListPage />;
}
