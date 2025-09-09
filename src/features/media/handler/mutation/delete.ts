import { deleteFilePocket } from "@/features/media/pocketbase/delete";

async function deleteFileHandler(ids: string[]) {
  return deleteFilePocket(ids);
}

export { deleteFileHandler };
