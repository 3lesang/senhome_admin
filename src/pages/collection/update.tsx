import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import CollectionForm, {
	type CollectionFormValuesType,
} from "@/components/form/collection";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { getOneCollectionQueryOptions } from "@/handlers/collection/query/one";
import { slugify } from "@/lib/utils";
import {
	type UpdateCollectionPayload,
	updateCollectionPocket,
} from "@/pocketbase/collection/update";

export default function CollectionUpdatePage() {
	const ref = useRef<UseFormReturn<CollectionFormValuesType>>(null);
	const { id = "" } = useParams({ strict: false });
	const { data } = useSuspenseQuery(getOneCollectionQueryOptions(id));
	const { mutate, isPending } = useMutation({
		mutationFn: (values: UpdateCollectionPayload) =>
			updateCollectionPocket(id, values),
		onSuccess: () => {
			toast.success("Update collection susscesfully");
		},
	});

	const handleSubmit = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit((values) =>
			mutate({
				name: values.name,
				description: values.description ?? "",
				slug: slugify(values.name),
				seo: {
					title: values.seo.title ?? values.name,
					description: values.seo.description ?? "",
				},
			}),
		)();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>{data.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<CollectionForm
					ref={ref}
					defaultValues={{
						name: data.name,
						description: JSON.stringify(data.description),
						seo: {
							title: data.seo?.title,
							description: data.seo?.desciprtion,
							slug: data.slug,
						},
					}}
				/>
			</CardContent>
			<CardFooter>
				<LoadingButton
					type="button"
					onClick={handleSubmit}
					loading={isPending}
					className="ml-auto"
				>
					Lưu
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
