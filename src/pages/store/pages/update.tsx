import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import StorePageForm, {
	type StorePageFormValuesType,
} from "@/components/page-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { getOneStorePageQueryOptions } from "@/handlers/store/query/page/one";
import { cn } from "@/lib/utils";
import { updateStorePagePocket } from "@/pocketbase/store/page/update";

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
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Link
						to="/store/pages"
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
					>
						<ChevronLeftIcon />
					</Link>
					{data.title}
				</CardTitle>
				<CardAction>
					<LoadingButton
						type="button"
						onClick={handleClick}
						loading={isPending}
					>
						Cập nhật
					</LoadingButton>
				</CardAction>
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
				<Button variant="outline">Xóa</Button>
			</CardFooter>
		</Card>
	);
}
