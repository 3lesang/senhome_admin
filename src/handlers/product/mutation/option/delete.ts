import { deleteOptionPocket } from "@/pocketbase/product/option/delete";

async function deleteOptionHandler(ids: string[]) {
	return deleteOptionPocket(ids);
}

export { deleteOptionHandler };
