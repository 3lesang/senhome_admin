import type { FileSchema } from "@/components/file-input/schema";
import type z from "zod";

export type FileDataType = {};
export type FileType = z.infer<typeof FileSchema>;
