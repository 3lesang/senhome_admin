import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import {
	ProductCollectionForm,
	type ProductCollectionFormValuesType,
} from "@/components/form/product/collection";
import {
	ProductFileForm,
	type ProductFileFormValuesType,
} from "@/components/form/product/file";
import {
	ProductInfoForm,
	type ProductInfoFormValuesType,
} from "@/components/form/product/info";
import {
	ProductPriceForm,
	type ProductPriceFormValuesType,
} from "@/components/form/product/price";
import {
	ProductSEOForm,
	type ProductSEOFormValuesType,
} from "@/components/form/product/seo";
import {
	ProductStatusForm,
	type ProductStatusFormValuesType,
} from "@/components/form/product/status";
import {
	ProductTagForm,
	type ProductTagFormValuesType,
} from "@/components/form/product/tag";
import {
	ProductVariantForm,
	type ProductVariantFormValuesType,
} from "@/components/form/product/variant";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createProductHandler } from "@/handlers/product/mutation/create";

export function ProductCreatePage() {
	const infoRef = useRef<UseFormReturn<ProductInfoFormValuesType>>(null);
	const fileRef = useRef<UseFormReturn<ProductFileFormValuesType>>(null);
	const priceRef = useRef<UseFormReturn<ProductPriceFormValuesType>>(null);
	const seoRef = useRef<UseFormReturn<ProductSEOFormValuesType>>(null);
	const statusRef = useRef<UseFormReturn<ProductStatusFormValuesType>>(null);
	const variantRef = useRef<UseFormReturn<ProductVariantFormValuesType>>(null);
	const tagRef = useRef<UseFormReturn<ProductTagFormValuesType>>(null);
	const collectionRef =
		useRef<UseFormReturn<ProductCollectionFormValuesType>>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: createProductHandler,
		onSuccess: () => {
			toast.success("Product create succesfully");
		},
	});

	const handleClick = () => {
		infoRef.current?.handleSubmit((infoValues) => {
			fileRef.current?.handleSubmit((fileValues) => {
				priceRef.current?.handleSubmit((priceValues) => {
					seoRef.current?.handleSubmit((seoValues) => {
						statusRef.current?.handleSubmit((statusValues) => {
							variantRef.current?.handleSubmit((variantValues) => {
								tagRef.current?.handleSubmit((tagValues) => {
									collectionRef.current?.handleSubmit((collectionValues) => {
										mutate({
											info: infoValues,
											status: statusValues.status,
											price: priceValues,
											file: fileValues.files,
											tags: tagValues.tags,
											seo: seoValues,
											options: variantValues.options,
											variants: variantValues.variants,
											collections: collectionValues.collections,
										});
									})();
								})();
							})();
						})();
					})();
				})();
			})();
		})();
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Thêm sản phẩm</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-12 gap-4">
				<div className="col-span-8 space-y-4">
					<ProductInfoForm ref={infoRef} />
					<ProductFileForm ref={fileRef} />
					<ProductPriceForm ref={priceRef} />
					<ProductVariantForm ref={variantRef} />
					<ProductSEOForm ref={seoRef} />
				</div>
				<div className="col-span-4 space-y-4">
					<ProductStatusForm ref={statusRef} />
					<ProductCollectionForm ref={collectionRef} />
					<ProductTagForm ref={tagRef} />
				</div>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button type="button" onClick={handleClick} disabled={isPending}>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
