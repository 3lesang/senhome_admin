import { createFileRoute } from "@tanstack/react-router";
import { StoreSettingsGeneral } from "@/pages/setting/general";
import { getStoreQueryOptions } from "@/queries/store";

export const Route = createFileRoute("/(app)/store/setting/general")({
  component: StoreSettingsGeneral,
  loader({ context }) {
    return context.queryClient?.ensureQueryData(getStoreQueryOptions());
  },
});
