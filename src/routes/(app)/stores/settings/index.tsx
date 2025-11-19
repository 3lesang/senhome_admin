import { createFileRoute } from "@tanstack/react-router";
import { StoreSettingsPage } from "@/pages/setting";

export const Route = createFileRoute("/(app)/stores/settings/")({
	component: StoreSettingsPage,
});
