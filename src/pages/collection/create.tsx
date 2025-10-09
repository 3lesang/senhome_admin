import { useMutation } from "@tanstack/react-query";
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
import { createCollectionHander } from "@/handlers/collection/mutation/create";

export function CollectionCreatePage() {
	const ref = useRef<UseFormReturn<CollectionFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: createCollectionHander,
		onSuccess: () => {
			toast.success("Tạo bộ sưu tập thành công");
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
				<CardTitle>Thêm nhóm sản phẩm</CardTitle>
			</CardHeader>
			<CardContent>
				<CollectionForm
					collectionId=""
					ref={ref}
					defaultValues={{
						name: "",
						content: "",
						slug: "",
						type: "manual",
						seo: { title: "", description: "" },
						schedule: null,
						file: null,
					}}
				/>
			</CardContent>
			<CardFooter>
				<Button
					type="button"
					className="ml-auto"
					disabled={isPending}
					onClick={handleSubmit}
				>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
