import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { StorePageFormValuesType } from "@/components/form/store/page";
import StorePageForm from "@/components/form/store/page";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { createStorePagePocket } from "@/pocketbase/page/create";

export default function StorePageCreatePage() {
	const ref = useRef<UseFormReturn<StorePageFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: (values: StorePageFormValuesType) =>
			createStorePagePocket({
				title: values.title,
				content: values.content ? JSON.parse(values.content) : null,
				slug: values.slug,
			}),
		onSuccess: () => {
			toast("Trang đã được tạo thành công!");
			ref.current?.reset();
		},
	});

	const handleSubmit = (values: StorePageFormValuesType) => {
		mutate(values);
	};

	const handleClick = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit(handleSubmit)();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Thêm trang mới</CardTitle>
			</CardHeader>
			<CardContent>
				<StorePageForm
					ref={ref}
					defaultValues={{
						title: "",
						content: "",
						slug: "",
					}}
				/>
			</CardContent>
			<CardFooter>
				<LoadingButton
					type="button"
					onClick={handleClick}
					loading={isPending}
					className="ml-auto"
				>
					Lưu
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
