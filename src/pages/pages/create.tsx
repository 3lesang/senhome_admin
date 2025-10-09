import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
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
import { createStorePageHandler } from "@/handlers/page/mutation/create";

export function StorePageCreatePage() {
	const ref = useRef<UseFormReturn<StorePageFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: createStorePageHandler,
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
