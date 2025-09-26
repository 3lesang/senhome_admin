import type z from "zod";
import type {
	AttributeDataListSchema,
	AttributeSchema,
	OptionSchema,
	OptionsSchema,
	ProductFormSchema,
	ProductVariantDataSchema,
	StatusSchema,
	VariantDataListSchema,
	VariantDataSchema,
	VariantOptionSchema,
	VariantOptionsSchema,
	VariantSchema,
} from "@/components/product-form/schema";

export type ProductDataType = {
	id: string;
	name: string;
	description?: string;
	content?: string;
	slug: string;
	price: number;
	discount: number;
	category: string;
	expand: {
		thumbnail: { id: string; file: { id: string }; collectionName: string };
	};
	deleted: Date;
};

export type UpdateProductDataType = {
	name?: string;
	content?: string;
	slug?: string;
	price?: number;
	discount?: number;
	category?: string;
	thumbnail?: string;
	deleted?: Date | null;
};

export type StatusType = z.infer<typeof StatusSchema>;
export type OptionType = z.infer<typeof OptionSchema>;
export type OptionsType = z.infer<typeof OptionsSchema>;
export type AttributeType = z.infer<typeof AttributeSchema>;
export type AttributeDataListType = z.infer<typeof AttributeDataListSchema>;
export type VariantType = z.infer<typeof VariantSchema>;
export type VariantOptionType = z.infer<typeof VariantOptionSchema>;
export type VariantOptionsType = z.infer<typeof VariantOptionsSchema>;
export type VariantDataType = z.infer<typeof VariantDataSchema>;
export type VariantDataListType = z.infer<typeof VariantDataListSchema>;
export type ProductVariantDataType = z.infer<typeof ProductVariantDataSchema>;
export type ProductFormType = z.infer<typeof ProductFormSchema>;
