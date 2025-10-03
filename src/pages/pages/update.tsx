import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
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
import { getOneStorePageQueryOptions } from "@/handlers/page/query/one";
import { updateStorePagePocket } from "@/pocketbase/page/update";

export default function StorePageUpdatePage() {
	const ref = useRef<UseFormReturn<StorePageFormValuesType>>(null);
	const { id = "" } = useParams({ strict: false });
	const { data, refetch } = useSuspenseQuery(getOneStorePageQueryOptions(id));

	const { mutate, isPending } = useMutation({
		mutationFn: (values: StorePageFormValuesType) =>
			updateStorePagePocket(id, {
				title: values.title,
				content: values.content ? JSON.parse(values.content) : null,
				slug: values.slug,
			}),
		onSuccess: () => {
			toast.success("Cập nhật trang thành công");
			refetch();
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
				<CardTitle>{data.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<StorePageForm
					ref={ref}
					defaultValues={{
						title: data?.title,
						content: JSON.stringify(data?.content),
						slug: data?.slug,
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
