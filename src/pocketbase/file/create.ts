import pocketClient from "@/pocketbase/client";
import { FILE_COLLECTION } from "@/pocketbase/constants";

async function createFilePocket(files: File[]) {
  const batch = pocketClient.createBatch();
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    batch.collection(FILE_COLLECTION).create(formData);
  }
  if (files.length) {
    return batch.send();
  }
  return;
}

export { createFilePocket };
