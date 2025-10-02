import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { MenuFormValuesType } from "@/components/form/menu";
import MenuForm from "@/components/form/menu";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import {
	type CreateMenuPayload,
	createMenuPocket,
} from "@/pocketbase/menu/create";

export default function MenuCreatePage() {
	const ref = useRef<UseFormReturn<MenuFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: (values: CreateMenuPayload) => createMenuPocket(values),
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
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Thêm menu</CardTitle>
				<CardAction>
					<LoadingButton loading={isPending} onClick={handleClick}>
						Lưu
					</LoadingButton>
				</CardAction>
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
		</Card>
	);
}
