import type { VariantNormalizeType } from "@/handlers/product/mutation/normalize";
import {
	type CreateVariantPayload,
	createVariantPocket,
} from "@/pocketbase/product/variant/create";

async function createVariantHandler(
	variants: VariantNormalizeType[],
	productId: string,
) {
	const variantIdMap: Record<string, string> = {};

	for (const variant of variants) {
		const payload: CreateVariantPayload = {
			price: variant.price,
			discount: variant.discount,
			stock: variant.stock,
			sku: variant.sku,
			product: productId,
		};
		const res = await createVariantPocket(payload);
		variantIdMap[variant.id] = res.id;
	}

	return variantIdMap;
}

export { createVariantHandler };
