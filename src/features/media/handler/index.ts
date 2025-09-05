import { batchMediaHttp } from "@/features/media/pocketbase/batch";
import type { FileType } from "@/features/media/components/schema";
import _ from "lodash";

async function batchMediaHandler(
  oldMedia: FileType[],
  newMedia: FileType[],
  productId: string
) {
  const removed = _.differenceBy(oldMedia, newMedia, "id");
  const added = _.differenceBy(newMedia, oldMedia, "id");
  return batchMediaHttp(added, removed, productId);
}

export { batchMediaHandler };
