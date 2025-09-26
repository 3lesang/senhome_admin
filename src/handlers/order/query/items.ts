import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { ORDER_ITEM_COLLECTION } from "@/pocketbase/constants";
import { getOneVariantFilePocket } from "@/pocketbase/file/variant/one";
import { getListItemOrderPocket } from "@/pocketbase/order/item/list";
import { getAttributeByVariantPocket } from "@/pocketbase/product/variant/attribute/one";
import type { OrderItemDataType } from "@/types/order";

export const getListItemOrderQueryOptions = (orderId: string) => {
	return queryOptions({
		queryKey: [ORDER_ITEM_COLLECTION, orderId],
		queryFn: async () => {
			const res = await getListItemOrderPocket(orderId);
			for (const item of res) {
				const variantId = item?.variant;
				if (variantId) {
					const attrs = await getAttributeByVariantPocket(variantId);
					try {
						const file = await getOneVariantFilePocket(variantId);
						item.file = file;
					} catch (error) {
						console.log(error);
					}
					item.attrs = attrs;
				}
			}
			return res;
		},
		select(data) {
			const result = data.map((item) => {
				const formatted: OrderItemDataType = {
					id: item.id,
					name: item?.expand?.product?.name,
					price: item?.price,
					discount: Number(item?.discount) * 100,
					quantity: item?.quantity,
					thumbnail: convertToFileUrl(item?.file?.expand?.file) ?? "",
					variant: item?.attrs?.map(
						(i: { expand: { attribute_value: { name: string } } }) =>
							i?.expand?.attribute_value?.name,
					),
				};
				return formatted;
			});

			return result;
		},
	});
};
