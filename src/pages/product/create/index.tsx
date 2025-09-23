import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import ProductForm from "@/components/product-form";
import { batchProductFileHandler } from "@/handlers/file/mutation/product";
import { batchVariantHandler } from "@/handlers/product/mutation/batch-variant";
import { createProductHandler } from "@/handlers/product/mutation/create";
import type { ProductFormType } from "@/types/product";
import CreatePageHeader from "./header";

export const defaultValues: ProductFormType = {
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
};

function ProductCreatePage() {
	const navigate = useNavigate();
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
				navigate({ to: "/product/$id", params: { id } });
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

	return (
		<div className="max-w-7xl mx-auto space-y-4 p-4">
			<CreatePageHeader />
			<ProductForm
				isPending={isPending}
				onSubmit={handleSubmit}
				defaultValues={defaultValues}
			/>
		</div>
	);
}

export default ProductCreatePage;
