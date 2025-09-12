import OrderListPage from "@/features/order/pages/list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/order/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderListPage />;
}
