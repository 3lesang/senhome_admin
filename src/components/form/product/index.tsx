import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import type { ProductFormType } from "@/types/product";
import ProductCategory from "./category";
import ProductInfo from "./info";
import ProductMedia from "./media";
import ProductPrice from "./price";
import { ProductFormSchema } from "./schema";
import ProductSEO from "./seo";
import ProductState from "./state";
import ProductThumbnail from "./thumbnail";
import ProductVariant from "./variant";

interface ProductProps {
	defaultValues: ProductFormType;
	ref: React.Ref<UseFormReturn<ProductFormType>>;
}

export default function ProductForm({ defaultValues, ref }: ProductProps) {
	const form = useForm<ProductFormType>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form, [form]);

	return (
		<Form {...form}>
			<form>
				<div className="grid grid-cols-12 gap-8">
					<div className="col-span-8 space-y-8">
						<ProductInfo form={form} />
						<ProductMedia form={form} />
						<ProductPrice form={form} />
						<ProductVariant
							data={form.getValues("variantData")}
							onChange={(data) => form.setValue("variantData", data)}
						/>
						<ProductSEO form={form} />
					</div>
					<div className="col-span-4 space-y-8">
						<ProductState form={form} />
						<ProductThumbnail form={form} />
						<ProductCategory form={form} />
					</div>
				</div>
			</form>
		</Form>
	);
}
