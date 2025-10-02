import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import CollectionForm from "@/components/form/collection";
import type { StorePageFormValuesType } from "@/components/form/store/page";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { createStorePagePocket } from "@/pocketbase/page/create";

export default function CollectionCreatePage() {
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
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Thông tin nhóm sản phẩm</CardTitle>
				<CardDescription>
					Vui lòng cung cấp các thông tin về nhóm sản phẩm sẽ tạo mới
				</CardDescription>
				<CardAction>
					<LoadingButton
						type="button"
						onClick={handleClick}
						loading={isPending}
					>
						Tạo nhóm sản phẩm
					</LoadingButton>
				</CardAction>
			</CardHeader>
			<CardContent>
				<CollectionForm />
			</CardContent>
		</Card>
	);
}
