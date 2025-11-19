import { SettingLayout } from "@/components/layout/setting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/stores/settings")({
  component: SettingLayout,
});
