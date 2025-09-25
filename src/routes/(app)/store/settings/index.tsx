import { createFileRoute } from "@tanstack/react-router";
import StoreSettingsPage from "@/pages/store/settings";

export const Route = createFileRoute("/(app)/store/settings/")({
	component: StoreSettingsPage,
});
