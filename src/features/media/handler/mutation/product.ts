import type { FileType } from "@/features/media/components/schema";
import { createProductFilePocket } from "@/features/media/pocketbase/product/create";
import { removeProductFilePocket } from "@/features/media/pocketbase/product/remove";
import _ from "lodash";

async function batchProductMediaHandler(
  oldMedia: FileType[],
  newMedia: FileType[],
  productId: string
) {
  const removed = _.differenceBy(oldMedia, newMedia, "id");
  const added = _.differenceBy(newMedia, oldMedia, "id");

  const fileAddedIds = added.map((f) => f.id);
  const fileRemovedIds = removed.map((f) => f.id);

  createProductFilePocket(productId, fileAddedIds);
  removeProductFilePocket(productId, fileRemovedIds);
  return;
}

export { batchProductMediaHandler };
