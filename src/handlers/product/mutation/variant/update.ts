import {
	type UpdateVariantPayload,
	updateVariantPocket,
} from "@/pocketbase/product/variant/update";

async function updateVariantHandler(payload: UpdateVariantPayload[]) {
	return updateVariantPocket(payload);
}

export { updateVariantHandler };
