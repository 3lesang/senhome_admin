import { deleteFilePocket } from "@/pocketbase/file/delete";

async function deleteFileHandler(ids: string[]) {
	return deleteFilePocket(ids);
}

export { deleteFileHandler };
