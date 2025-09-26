import pocketClient from "@/pocketbase/client";
import { ORDER_ITEM_COLLECTION } from "@/pocketbase/constants";

async function getListItemOrderPocket(orderId: string) {
	const res = await pocketClient.collection(ORDER_ITEM_COLLECTION).getFullList({
		filter: `order="${orderId}"`,
		expand: "product,variant",
	});
	return res;
}

export { getListItemOrderPocket };
