import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import ProductForm from "@/components/product-form";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { batchProductFileHandler } from "@/handlers/file/mutation/product";
import { batchVariantHandler } from "@/handlers/product/mutation/batch-variant";
import { createProductHandler } from "@/handlers/product/mutation/create";
import { cn } from "@/lib/utils";
import type { ProductFormType } from "@/types/product";

export default function ProductCreatePage() {
	const navigate = useNavigate();
	const ref = useRef<UseFormReturn<ProductFormType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: ProductFormType) => {
			const resp = await createProductHandler(values);
			const { media = [], variantData = {} } = values;
			if (resp?.id) {
				const productId = resp.id;
				await batchProductFileHandler([], media, productId);
				await batchVariantHandler(variantData, productId);
				return productId;
			}

			return null;
		},
		onSuccess: (id) => {
			if (id) {
				navigate({ to: "/products/$id", params: { id } });
				toast.success("Thêm sản phẩm thành công");
			}
		},
		onError: () => {
			toast.error("Không thể tạo sản phẩm");
		},
	});

	const handleSubmit = (values: ProductFormType) => {
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
						to="/products"
						className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
					>
						<ChevronLeftIcon />
					</Link>
					Thêm sản phẩm
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ProductForm
					ref={ref}
					defaultValues={{
						name: "",
						price: "",
						discount: "",
						slug: "",
						content: "",
						thumbnail: [],
						category: "",
						state: "draft",
						media: [],
						variantData: {},
					}}
				/>
			</CardContent>
			<CardFooter className="flex justify-end">
				<LoadingButton type="button" loading={isPending} onClick={handleClick}>
					Tạo sản phẩm
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
