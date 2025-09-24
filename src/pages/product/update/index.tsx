import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import ProductForm from "@/components/product-form";
import {
	batchProductFileHandler,
	batchProductOrderFile,
} from "@/handlers/file/mutation/product";
import { batchVariantHandler } from "@/handlers/product/mutation/batch-variant";
import { updateProductHandler } from "@/handlers/product/mutation/update";
import { productFilesQueryOptions } from "@/handlers/product/query/media";
import { productQueryOptions } from "@/handlers/product/query/one";
import { productVariantQueryOptions } from "@/handlers/product/query/variant";
import type { ProductFormType } from "@/types/product";
import { formatProductDataForm } from "./format";
import UpdatePageHeader from "./header";

export default function ProductUpdatePage() {
	const { id = "" } = useParams({ strict: false });

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

	return (
		<div>
			<UpdatePageHeader data={data} />
			<div className="max-w-7xl mx-auto pb-8">
				<ProductForm
					onSubmit={handleSubmit}
					isUpdate
					isPending={isPending}
					defaultValues={defaultProduct}
				/>
			</div>
		</div>
	);
}
