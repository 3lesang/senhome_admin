import type z from "zod";
import type { FileSchema } from "@/components/file-input/schema";

export type FileDataType = {
	id: string;
};
export type FileType = z.infer<typeof FileSchema>;
