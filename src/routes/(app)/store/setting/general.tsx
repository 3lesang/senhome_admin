import { createFileRoute } from "@tanstack/react-router";
import { getStoreQueryOptions } from "@/api/store/one";
import { StoreSettingsGeneral } from "@/pages/setting/general";

export const Route = createFileRoute("/(app)/store/setting/general")({
	component: StoreSettingsGeneral,
	loader({ context }) {
		return context.queryClient?.ensureQueryData(getStoreQueryOptions());
	},
});
