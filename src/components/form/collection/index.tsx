import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";
import { CollectionFile } from "./file";
import CollectionInfo from "./info";
import CollectionManualProduct from "./product/manual";
import CollectionSmartProduct from "./product/smart";
import CollectionPublish from "./publish";
import CollectionSEO from "./seo";
import CollectionType from "./type";

const schema = z.object({
	name: z.string(),
	content: z.string().optional(),
	slug: z.string().optional(),
	type: z.enum(["manual", "smart"]).catch("manual"),
	seo: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
	}),
	file: z.object({ id: z.string(), url: z.string() }).nullable(),
	schedule: z.date().nullable(),
});

export type CollectionFormValuesType = z.infer<typeof schema>;

interface CollectionFormProps {
	defaultValues: CollectionFormValuesType;
	ref: React.Ref<UseFormReturn<CollectionFormValuesType>>;
	collectionId: string;
}

export default function CollectionForm({
	defaultValues,
	ref,
	collectionId,
}: CollectionFormProps) {
	const form = useForm<CollectionFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);
	const type = form.watch("type");

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-4">
				<div className="col-span-8 space-y-4">
					<CollectionInfo form={form} />
					{!collectionId && <CollectionType form={form} />}
					{type === "manual" && <CollectionManualProduct />}
					{type === "smart" && <CollectionSmartProduct form={form} />}
					<CollectionSEO form={form} />
				</div>
				<div className="col-span-4 space-y-4">
					<CollectionPublish form={form} />
					<CollectionFile form={form} />
				</div>
			</form>
		</Form>
	);
}
