import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import CollectionForm, {
	type CollectionFormValuesType,
} from "@/components/form/collection";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { updateCollectionHandler } from "@/handlers/collection/mutation/update";
import { getOneCollectionQueryOptions } from "@/handlers/collection/query/one";
import { convertToFileUrl } from "@/lib/utils";

export function CollectionUpdatePage() {
	const ref = useRef<UseFormReturn<CollectionFormValuesType>>(null);
	const { id = "" } = useParams({ strict: false });

	const { data } = useSuspenseQuery(getOneCollectionQueryOptions(id));

	const { mutate, isPending } = useMutation({
		mutationFn: updateCollectionHandler,
		onSuccess: () => {
			toast.success("Update collection susscesfully");
		},
	});

	const handleSubmit = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit((values) => {
			console.log(values);
			mutate();
		})();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>{data.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<CollectionForm
					collectionId={data.id}
					ref={ref}
					defaultValues={{
						name: data.name,
						content: JSON.stringify(data.content),
						type: data.type,
						slug: data.slug,
						seo: {
							title: data?.seo?.title,
							description: data?.seo?.description,
						},
						schedule: data.schedule,
						file: {
							id: data.expand.file?.id,
							url: convertToFileUrl(data.expand.file) ?? "",
						},
					}}
				/>
			</CardContent>
			<CardFooter>
				<Button
					type="button"
					disabled={isPending}
					className="ml-auto"
					onClick={handleSubmit}
				>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
