import { createFileRoute } from "@tanstack/react-router";
import { StoreSettingsPage } from "@/pages/setting";

export const Route = createFileRoute("/(app)/store/setting/")({
	component: StoreSettingsPage,
});
