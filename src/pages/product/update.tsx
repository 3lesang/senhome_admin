import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import ProductForm from "@/components/product-form";
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
import {
	batchProductFileHandler,
	batchProductOrderFile,
} from "@/handlers/file/mutation/product";
import { batchVariantHandler } from "@/handlers/product/mutation/batch-variant";
import { updateProductHandler } from "@/handlers/product/mutation/update";
import { productFilesQueryOptions } from "@/handlers/product/query/media";
import { productQueryOptions } from "@/handlers/product/query/one";
import { productVariantQueryOptions } from "@/handlers/product/query/variant";
import { cn, convertToFileUrl } from "@/lib/utils";
import type { FileType } from "@/types/file";
import type {
	ProductDataType,
	ProductFormType,
	ProductVariantDataType,
} from "@/types/product";

function formatProductDataForm(
	data: ProductDataType,
	media?: FileType[],
	productVariantData?: ProductVariantDataType,
): ProductFormType {
	const thumbnail = {
		id: data?.expand?.thumbnail?.id,
		url: convertToFileUrl(data?.expand?.thumbnail) ?? "",
	};
	return {
		id: data?.id,
		name: data?.name,
		content: JSON.stringify(data?.content),
		price: data?.price?.toString() || "",
		discount: data?.discount > 0 ? (data?.discount * 100)?.toString() : "",
		slug: data?.slug || "",
		category: data?.category || "",
		thumbnail: [thumbnail],
		state: data?.deleted ? "draft" : "publish",
		media,
		variantData: productVariantData,
	};
}

export default function ProductUpdatePage() {
	const { id = "" } = useParams({ strict: false });

	const ref = useRef<UseFormReturn<ProductFormType>>(null);

	const { data: media, refetch: refetchMedia } = useSuspenseQuery(
		productFilesQueryOptions(id),
	);
	const { data: variantData } = useSuspenseQuery(
		productVariantQueryOptions(id),
	);
	const { data, refetch: refetchProduct } = useSuspenseQuery(
		productQueryOptions(id),
	);
	const defaultProduct = formatProductDataForm(data, media, variantData);

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: ProductFormType) => {
			updateProductHandler(defaultProduct, values, id);
			await batchProductFileHandler(
				defaultProduct.media ?? [],
				values.media ?? [],
				id,
			);
			await batchProductOrderFile(values.media ?? [], id);
			await batchVariantHandler(values.variantData ?? {}, id);
			return;
		},
		onSuccess: () => {
			refetchProduct();
			refetchMedia();
			toast("Cập nhật sản phẩm thành công.");
		},
	});

	const handleSubmit = async (values: ProductFormType) => {
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
					{defaultProduct.name}
				</CardTitle>
				<CardAction>
					<LoadingButton
						type="button"
						loading={isPending}
						onClick={handleClick}
					>
						Cập nhật
					</LoadingButton>
				</CardAction>
			</CardHeader>
			<CardContent>
				<ProductForm ref={ref} defaultValues={defaultProduct} />
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Xóa</Button>
			</CardFooter>
		</Card>
	);
}
