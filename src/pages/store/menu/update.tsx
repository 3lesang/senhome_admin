import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import MenuForm, { type MenuFormValuesType } from "@/components/menu-form";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { getOneMenuQueryOptions } from "@/handlers/menu/query/one";
import { cn } from "@/lib/utils";
import {
	type UpadteMenuPayload,
	updateMenuPocket,
} from "@/pocketbase/menu/update";

export default function UpdateMenuPage() {
	const { id } = useParams({ from: "/(app)/store/menus/$id" });
	const { data, refetch } = useSuspenseQuery(getOneMenuQueryOptions(id));
	const ref = useRef<UseFormReturn<MenuFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: (values: UpadteMenuPayload) => updateMenuPocket(id, values),
		onSuccess: () => {
			toast.success("Cập nhật menu thành công");
			refetch();
		},
	});

	const handleSubmit = (values: MenuFormValuesType) => {
		mutate(values);
	};

	const handleClick = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit(handleSubmit)();
	};
	return (
		<Card className="bg-sidebar shadow-none border-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Link
						to="/store/menus"
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
					>
						<ChevronLeftIcon />
					</Link>
					{data.name}
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
				<MenuForm
					ref={ref}
					defaultValues={{
						name: data?.name ?? "",
						position: data?.position,
						items: data?.items ?? [],
					}}
				/>
			</CardContent>
		</Card>
	);
}
