import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import type { ProductFormType } from "@/types/product";
import ProductInfo from "./info";
import ProductMedia from "./media";
import ProductPrice from "./price";
import { ProductFormSchema } from "./schema";
import ProductSidebar from "./sidebar";
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
					<div className="col-span-8">
						<div className="grid grid-cols-12 gap-8">
							<div className="col-span-12">
								<ProductInfo />
							</div>
							<div className="col-span-12">
								<ProductMedia />
							</div>
							<div className="col-span-12">
								<ProductPrice />
							</div>
							<div className="col-span-12">
								<ProductVariant
									data={form.getValues("variantData")}
									onChange={(data) => form.setValue("variantData", data)}
								/>
							</div>
						</div>
					</div>
					<div className="col-span-4">
						<ProductSidebar />
					</div>
				</div>
			</form>
		</Form>
	);
}
