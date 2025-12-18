import { createFileRoute } from "@tanstack/react-router";
import { DeliveryCreatePage } from "@/pages/delivery/create";

export const Route = createFileRoute("/(app)/deliveries/create")({
	component: DeliveryCreatePage,
});
