import type { VariantNormalizeType } from "@/handlers/product/mutation/normalize";
import { getListVariantProductFilePocket } from "@/pocketbase/file/variant/list";
import {
	type UpdateVariantFilePayload,
	updateVariantFilePocket,
} from "@/pocketbase/file/variant/update";

async function updateVariantFileProductHandler(
	productId: string,
	payload: VariantNormalizeType[],
) {
	const variantFileMap: Record<string, string> = {};
	payload.forEach((i) => {
		variantFileMap[i.id] = i.image?.[0]?.id ?? "";
	});

	const res = await getListVariantProductFilePocket(productId);
	const formatPayload: UpdateVariantFilePayload[] = res.map((i) => {
		const variantId = i.variant;
		const body: UpdateVariantFilePayload = {
			id: i.id,
			fileId: variantFileMap[variantId],
		};
		return body;
	});

	return updateVariantFilePocket(formatPayload);
}

export { updateVariantFileProductHandler };
