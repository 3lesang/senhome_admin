import { useMutation } from "@tanstack/react-query";
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
import { createMenuHandler } from "@/handlers/menu/mutation/create";

export function MenuCreatePage() {
	const ref = useRef<UseFormReturn<MenuFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: createMenuHandler,
		onSuccess: () => {
			toast.success("Tạo menu thành công");
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
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Thêm menu</CardTitle>
			</CardHeader>
			<CardContent>
				<MenuForm
					defaultValues={{
						name: "",
						position: "header",
						items: [],
					}}
					ref={ref}
				/>
			</CardContent>
			<CardFooter>
				<Button disabled={isPending} className="ml-auto" onClick={handleClick}>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
