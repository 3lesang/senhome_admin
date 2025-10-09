import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { MenuFormValuesType } from "@/components/form/menu";
import MenuForm from "@/components/form/menu";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { updateMenuHandler } from "@/handlers/menu/mutation/update";
import { getOneMenuQueryOptions } from "@/handlers/menu/query/one";

export function UpdateMenuPage() {
	const { id } = useParams({ from: "/(app)/store/menus/$id" });
	const { data, refetch } = useSuspenseQuery(getOneMenuQueryOptions(id));
	const ref = useRef<UseFormReturn<MenuFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: updateMenuHandler,
		onSuccess: () => {
			toast.success("Cập nhật menu thành công");
			refetch();
		},
	});

	const handleSubmit = (values: MenuFormValuesType) => {
		console.log(values);
		mutate();
	};

	const handleClick = () => {
		const form = ref.current;
		if (!form) return;
		form.handleSubmit(handleSubmit)();
	};

	return (
		<Card className="bg-sidebar shadow-none border-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>{data.name}</CardTitle>
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
			<CardFooter>
				<Button
					type="button"
					disabled={isPending}
					className="ml-auto"
					onClick={handleClick}
				>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
