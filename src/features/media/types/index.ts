import type { FileSchema } from "@/features/media/components/schema";
import type z from "zod";

export type FileDataType = {};
export type FileType = z.infer<typeof FileSchema>;
