import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import { FileSchema } from "@/components/file/schema";
import { Form } from "@/components/ui/form";
import CollectionInfo from "./info";
import CollectionProduct from "./product";
import CollectionPublish from "./publish";
import CollectionSEO from "./seo";
import CollectionThumbnail from "./thumbnail";
import CollectionType from "./type";

const schema = z.object({
	name: z.string(),
	description: z.string().optional(),
	seo: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		slug: z.string().optional(),
	}),
	thumbnail: z.array(FileSchema).optional(),
});

export type CollectionFormValuesType = z.infer<typeof schema>;

interface CollectionFormProps {
	defaultValues: CollectionFormValuesType;
	ref: React.Ref<UseFormReturn<CollectionFormValuesType>>;
}

export default function CollectionForm({
	defaultValues,
	ref,
}: CollectionFormProps) {
	const form = useForm<CollectionFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-4">
				<div className="col-span-8 space-y-4">
					<CollectionInfo form={form} />
					<CollectionType />
					<CollectionProduct />
					<CollectionSEO form={form} />
				</div>
				<div className="col-span-4 space-y-4">
					<CollectionPublish form={form} />
					<CollectionThumbnail form={form} />
				</div>
			</form>
		</Form>
	);
}
