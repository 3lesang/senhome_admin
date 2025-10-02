import type z from "zod";
import type { FileSchema } from "@/components/form/product/schema";

export type FileDataType = {
	id: string;
	collectionName: string;
	file: { id: string };
};

export type FileType = z.infer<typeof FileSchema>;
