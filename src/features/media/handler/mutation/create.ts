import { createFilePocket } from "@/features/media/pocketbase/create";

async function createFileHandler(files: File[]) {
  return createFilePocket(files);
}

export { createFileHandler };
