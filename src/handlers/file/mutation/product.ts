import _ from "lodash";
import {
	type CreateProductFilePayload,
	createProductFilePocket,
} from "@/pocketbase/file/product/create";
import { deleteProductFilePocket } from "@/pocketbase/file/product/delete";
import { getListProductFilePocket } from "@/pocketbase/file/product/list";
import {
	type UpdateProductFilePayload,
	updateProductFilePocket,
} from "@/pocketbase/file/product/update";
import type { FileType } from "@/types/file";

async function batchProductFileHandler(
	oldFiles: FileType[],
	newFiles: FileType[],
	productId: string,
) {
	const added = _.differenceBy(newFiles, oldFiles, "id");

	const addedProductFilePayload: CreateProductFilePayload[] = added.map((f) => {
		const index = newFiles.findIndex((item) => item.id === f.id);
		const item: CreateProductFilePayload = {
			productId,
			filedId: f.id,
			order: index,
		};
		return item;
	});

	createProductFilePocket(addedProductFilePayload);

	const removed = _.differenceBy(oldFiles, newFiles, "id");
	const fileRemovedIds = removed.map((f) => f.id);

	const productFileData = await getListProductFilePocket(productId);
	const idsRemoved = productFileData
		.filter((f) => fileRemovedIds.includes(f.file))
		.map((i) => i.id);

	deleteProductFilePocket(idsRemoved);
	return;
}

async function batchProductOrderFile(newFiles: FileType[], productId: string) {
	const productFileData = await getListProductFilePocket(productId);
	const payload: UpdateProductFilePayload[] = newFiles.map((f, index) => {
		const id = productFileData.find(
			(i) => i.product === productId && i.file === f.id,
		)?.id;
		return { id: id ?? "", order: index };
	});

	return updateProductFilePocket(payload);
}

export { batchProductFileHandler, batchProductOrderFile };
