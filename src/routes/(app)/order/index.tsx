import { createFileRoute } from "@tanstack/react-router";
import OrderListPage from "@/app/order/pages/list";

export const Route = createFileRoute("/(app)/order/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <OrderListPage />;
}
