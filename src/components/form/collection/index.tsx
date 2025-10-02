import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import CollectionInfo from "./info";
import CollectionSEO from "./seo";

const schema = z.object({
	name: z.string(),
	description: z.string().optional(),
	seo: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		slug: z.string().optional(),
	}),
});

export type CollectionFormValuesType = z.infer<typeof schema>;

export default function CollectionForm() {
	const form = useForm<CollectionFormValuesType>({
		resolver: zodResolver(schema),
	});
	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-8">
				<div className="col-span-8 space-y-8">
					<CollectionInfo form={form} />
					<CollectionSEO form={form} />
				</div>
				<div className="col-span-4 space-y-4">
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>Hiển thị</CardTitle>
						</CardHeader>
					</Card>
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>Hình ảnh</CardTitle>
						</CardHeader>
					</Card>
				</div>
			</form>
		</Form>
	);
}
