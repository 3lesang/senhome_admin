import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { MenuFormValuesType } from "@/components/menu-form";
import MenuForm from "@/components/menu-form";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
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
				<CardTitle className="flex items-center gap-2">
					<Link
						to="/store/menus"
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
					>
						<ChevronLeftIcon />
					</Link>
					Thêm menu
				</CardTitle>
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
