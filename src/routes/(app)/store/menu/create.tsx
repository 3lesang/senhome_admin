import { createFileRoute } from "@tanstack/react-router";
import { MenuCreatePage } from "@/pages/menu/create";

export const Route = createFileRoute("/(app)/store/menu/create")({
	component: MenuCreatePage,
});
