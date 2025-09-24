import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import GeneralForm, {
	type GeneralFormValuesType,
} from "@/components/general-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getStoreQueryOptions } from "@/handlers/store/one";
import { createStorePocket } from "@/pocketbase/store/create";
import {
	type UpdateStorePayload,
	updateStorePocket,
} from "@/pocketbase/store/update";

export const Route = createFileRoute("/(app)/store/general")({
	component: RouteComponent,
	loader(ctx) {
		ctx.context.queryClient?.ensureQueryData(getStoreQueryOptions());
	},
});

function RouteComponent() {
	const { data } = useSuspenseQuery(getStoreQueryOptions());
	const { mutate, isPending } = useMutation({
		mutationFn: (values: GeneralFormValuesType) => {
			const payload: UpdateStorePayload = {
				name: values.name,
				description: values?.description ?? "",
				email: values.email,
				phone: values.phone,
				social: values.social,
				address: values?.address ?? "",
			};
			if (data?.id) {
				return updateStorePocket(data.id, payload);
			}
			return createStorePocket(payload);
		},
		onSuccess: () => {
			toast("Cập nhật thành công");
		},
	});
	const handleSubmit = (values: GeneralFormValuesType) => {
		mutate(values);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Thông tin chung</CardTitle>
				<CardDescription>Cập nhật thông tin chung</CardDescription>
			</CardHeader>
			<CardContent>
				<GeneralForm
					defaultValues={{
						name: data?.name ?? "",
						description: data?.description ?? "",
						phone: data?.phone ?? "",
						email: data?.email ?? "",
						address: data?.address ?? "",
						social: data?.social,
					}}
					onSubmit={handleSubmit}
					isPending={isPending}
				/>
			</CardContent>
		</Card>
	);
}
