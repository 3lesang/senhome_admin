import { SettingLayout } from "@/components/layout/setting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/store/setting")({
  component: SettingLayout,
});
