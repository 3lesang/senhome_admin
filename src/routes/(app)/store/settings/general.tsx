import { createFileRoute } from "@tanstack/react-router";
import { getStoreQueryOptions } from "@/handlers/store/query/one";
import StoreSettingsGeneral from "@/pages/store/general";

export const Route = createFileRoute("/(app)/store/settings/general")({
	component: StoreSettingsGeneral,
	loader({ context }) {
		return context.queryClient?.ensureQueryData(getStoreQueryOptions());
	},
});
