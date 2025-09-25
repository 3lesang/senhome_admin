import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import StorePageForm, {
	type StorePageFormValuesType,
} from "@/components/page-form";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { createStorePagePocket } from "@/pocketbase/store/page/create";

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
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Link
						to="/store/pages"
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
					>
						<ChevronLeftIcon />
					</Link>
					Thêm trang mới
				</CardTitle>
				<CardAction>
					<LoadingButton
						type="button"
						onClick={handleClick}
						loading={isPending}
					>
						Thêm trang
					</LoadingButton>
				</CardAction>
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
			<CardFooter></CardFooter>
		</Card>
	);
}
