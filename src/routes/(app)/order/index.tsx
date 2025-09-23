import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import OrderListPage from "@/pages/order/list";

const schema = z.object({
	q: z.string().optional(),
});

export const Route = createFileRoute("/(app)/order/")({
	component: RouteComponent,
	validateSearch: schema,
});

function RouteComponent() {
	return <OrderListPage />;
}
