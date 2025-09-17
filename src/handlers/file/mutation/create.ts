import { createFilePocket } from "@/pocketbase/file/create";

async function createFileHandler(files: File[]) {
  return createFilePocket(files);
}

export { createFileHandler };
