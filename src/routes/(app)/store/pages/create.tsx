import { createFileRoute } from "@tanstack/react-router";
import StorePageCreatePage from "@/pages/store/pages/create";

export const Route = createFileRoute("/(app)/store/pages/create")({
	component: StorePageCreatePage,
});
