import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
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

export default function CollectionCreatePage() {
	const ref = useRef<UseFormReturn<CollectionFormValuesType>>(null);

	const handleSubmit = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit((values) => console.log(values))();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Thêm nhóm sản phẩm</CardTitle>
			</CardHeader>
			<CardContent>
				<CollectionForm
					ref={ref}
					defaultValues={{
						name: "",
						description: "",
						seo: { title: "", description: "", slug: "" },
					}}
				/>
			</CardContent>
			<CardFooter>
				<LoadingButton type="button" onClick={handleSubmit} className="ml-auto">
					Lưu
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
