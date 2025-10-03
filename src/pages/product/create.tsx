import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import ProductForm from "@/components/form/product";
import type { ProductFormType } from "@/components/form/product/types";
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
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Thêm sản phẩm</CardTitle>
			</CardHeader>
			<CardContent>
				<ProductForm
					ref={ref}
					defaultValues={{
						name: "",
						price: "",
						discount: "",
						content: "",
						thumbnail: [],
						category: "",
						state: "draft",
						media: [],
						variantData: {},
						seo: {
							title: "",
							slug: "",
							description: "",
						},
					}}
				/>
			</CardContent>
			<CardFooter className="flex justify-end">
				<LoadingButton type="button" loading={isPending} onClick={handleClick}>
					Lưu
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
