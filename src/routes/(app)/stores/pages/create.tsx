import { createFileRoute } from "@tanstack/react-router";
import { StorePageCreatePage } from "@/pages/page/create";

export const Route = createFileRoute("/(app)/stores/pages/create")({
	component: StorePageCreatePage,
});
