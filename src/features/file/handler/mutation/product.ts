import {
  createProductFilePocket,
  type CreateProductFilePayload,
} from "@/pocketbase/file/product/create";
import { deleteProductFilePocket } from "@/pocketbase/file/product/delete";
import { getListProductFilePocket } from "@/pocketbase/file/product/list";
import type { FileType } from "@/features/file/types";
import _ from "lodash";

async function batchProductMediaHandler(
  oldMedia: FileType[],
  newMedia: FileType[],
  productId: string
) {
  const added = _.differenceBy(newMedia, oldMedia, "id");

  const addedProductFilePayload: CreateProductFilePayload[] = added.map((f) => {
    const item: CreateProductFilePayload = {
      productId,
      filedId: f.id,
    };
    return item;
  });

  createProductFilePocket(addedProductFilePayload);

  const removed = _.differenceBy(oldMedia, newMedia, "id");
  const fileRemovedIds = removed.map((f) => f.id);

  const productFileData = await getListProductFilePocket(productId);
  const idsRemoved = productFileData
    .filter((f) => fileRemovedIds.includes(f.file))
    .map((i) => i.id);

  deleteProductFilePocket(idsRemoved);
  return;
}

export { batchProductMediaHandler };
