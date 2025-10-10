import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { getOneStorePageQueryOptions } from "@/api/page/one";
import { updateStorePageHandler } from "@/api/page/update";
import type { StorePageFormValuesType } from "@/components/form/store/page";
import StorePageForm from "@/components/form/store/page";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export function StorePageUpdatePage() {
	const ref = useRef<UseFormReturn<StorePageFormValuesType>>(null);
	const { id = "" } = useParams({ strict: false });
	const { data, refetch } = useSuspenseQuery(getOneStorePageQueryOptions(id));

	const { mutate, isPending } = useMutation({
		mutationFn: updateStorePageHandler,
		onSuccess: () => {
			toast.success("Cập nhật trang thành công");
			refetch();
		},
	});

	const handleSubmit = (values: StorePageFormValuesType) => {
		mutate({ id, values });
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
				<Button
					type="button"
					onClick={handleClick}
					disabled={isPending}
					className="ml-auto"
				>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
