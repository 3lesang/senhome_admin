import { createFileRoute } from "@tanstack/react-router";
import MenuCreatePage from "@/pages/store/menu/create";

export const Route = createFileRoute("/(app)/store/menus/create")({
	component: MenuCreatePage,
});
