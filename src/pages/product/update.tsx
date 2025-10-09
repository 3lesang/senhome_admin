import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { ChevronDownIcon, Trash2Icon } from "lucide-react";
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
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { getCollectionsProductQueryOptions } from "@/handlers/collection/query/list";
import { getOptionsProductQueryOptions } from "@/handlers/option/query/list";
import { updateProductHander } from "@/handlers/product/mutation/update";
import { productQueryOptions } from "@/handlers/product/query/one";
import { getVariantsProductQueryOptions } from "@/handlers/variant/query/list";
import { convertToFileUrl } from "@/lib/utils";

export function ProductUpdatePage() {
	const { id } = useParams({ from: "/(app)/products/$id" });
	const infoRef = useRef<UseFormReturn<ProductInfoFormValuesType>>(null);
	const fileRef = useRef<UseFormReturn<ProductFileFormValuesType>>(null);
	const priceRef = useRef<UseFormReturn<ProductPriceFormValuesType>>(null);
	const seoRef = useRef<UseFormReturn<ProductSEOFormValuesType>>(null);
	const statusRef = useRef<UseFormReturn<ProductStatusFormValuesType>>(null);
	const variantRef = useRef<UseFormReturn<ProductVariantFormValuesType>>(null);
	const tagRef = useRef<UseFormReturn<ProductTagFormValuesType>>(null);
	const collectionRef =
		useRef<UseFormReturn<ProductCollectionFormValuesType>>(null);

	const { data: product } = useSuspenseQuery(productQueryOptions(id));
	const { data: options } = useSuspenseQuery(getOptionsProductQueryOptions(id));
	const { data: variants } = useSuspenseQuery(
		getVariantsProductQueryOptions(id),
	);
	const { data: collections } = useSuspenseQuery(
		getCollectionsProductQueryOptions(id),
	);

	const { mutate, isPending } = useMutation({
		mutationFn: updateProductHander,
		onSuccess: () => {
			toast.success("Update product successfully");
		},
	});

	function handleClick() {
		infoRef.current?.handleSubmit((infoValues) => {
			fileRef.current?.handleSubmit((fileValues) => {
				priceRef.current?.handleSubmit((priceValues) => {
					seoRef.current?.handleSubmit((seoValues) => {
						statusRef.current?.handleSubmit((statusValues) => {
							tagRef.current?.handleSubmit((tagValues) => {
								collectionRef.current?.handleSubmit((collectionValues) => {
									variantRef.current?.handleSubmit((variantValues) => {
										mutate({
											id,
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
	}

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<CardAction className="flex gap-2">
					<Button type="button" variant="secondary">
						Xem trước
					</Button>
					<Button type="button" variant="secondary">
						Nhân bản
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button type="button" variant="secondary">
								Thêm hành động
								<ChevronDownIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Trash2Icon />
								Xóa sản phẩm
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardAction>
			</CardHeader>
			<CardContent className="grid grid-cols-12 gap-4">
				<div className="col-span-8 space-y-4">
					<ProductInfoForm
						ref={infoRef}
						defaultValues={{
							name: product.name,
							content: JSON.stringify(product.content),
						}}
					/>
					<ProductFileForm
						ref={fileRef}
						defaultValues={{
							files: product.expand?.file
								? product.expand?.file.map((f) => ({
										id: f.id,
										url: convertToFileUrl(f) ?? "",
									}))
								: [],
						}}
					/>
					<ProductPriceForm
						ref={priceRef}
						defaultValues={{
							price: product.price,
							sale_price: product.sale_price,
						}}
					/>
					<ProductVariantForm
						ref={variantRef}
						defaultValues={{
							options,
							variants: variants.map((v) => ({
								id: v.id,
								price: v.price,
								sale_price: v.sale_price,
								stock: v.stock,
								sku: v.sku,
								combos: v.combos,
								file: v.expand.file?.id
									? {
											id: v.expand.file.id,
											url: convertToFileUrl(v.expand.file),
										}
									: null,
							})),
						}}
					/>
					<ProductSEOForm
						ref={seoRef}
						defaultValues={{
							title: product.seo?.title,
							description: product.seo?.description,
							slug: product.slug,
						}}
					/>
				</div>
				<div className="col-span-4 space-y-4">
					<ProductStatusForm
						ref={statusRef}
						defaultValues={{ status: product.status }}
					/>
					<ProductCollectionForm
						ref={collectionRef}
						defaultValues={{
							collections: collections.map((c) => c.expand.collection),
						}}
					/>
					<ProductTagForm
						ref={tagRef}
						defaultValues={{
							tags: product.tag
								? product.tag.split(",").map((t) => ({ name: t }))
								: [],
						}}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					type="button"
					className="ml-auto"
					disabled={isPending}
					onClick={handleClick}
				>
					{isPending && <Spinner />}
					Lưu
				</Button>
			</CardFooter>
		</Card>
	);
}
