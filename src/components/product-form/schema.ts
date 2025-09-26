import z from "zod";
import { PRODUCT_STATE } from "@/constants/product";

export const FileSchema = z.object({
	id: z.string(),
	url: z.string(),
});

export const StatusSchema = z.enum(["new", "updated", "removed", "unchanged"]);
export const ProductStateSchema = z.enum(
	Object.values(PRODUCT_STATE).map((s) => s.value) as [string, ...string[]],
);

export const withStatus = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
	schema.extend({ status: StatusSchema.optional() });

export const OptionSchema = withStatus(
	z.object({
		id: z.string(),
		name: z.string(),
	}),
);

export const OptionsSchema = z.record(z.string(), OptionSchema);

export const AttributeSchema = withStatus(
	z.object({
		id: z.string(),
		name: z.string(),
		options: OptionsSchema,
	}),
);

export const VariantSchema = withStatus(
	z.object({
		id: z.string(),
		price: z.number().nonnegative(),
		discount: z.number().min(0).max(100),
		stock: z.number().nonnegative(),
		sku: z.string(),
		image: z.array(FileSchema).optional(),
	}),
);

export const VariantOptionSchema = z.object({
	option: OptionSchema,
	variant: VariantSchema,
});

export const AttributeDataListSchema = z.record(z.string(), AttributeSchema);

export const VariantOptionsSchema = VariantSchema.extend({
	options: OptionsSchema,
});

export const VariantDataSchema = z.record(z.string(), VariantOptionSchema);

export const VariantDataListSchema = z.record(z.string(), VariantDataSchema);

export const ProductVariantDataSchema = z.object({
	attributes: AttributeDataListSchema.optional(),
	variants: VariantDataListSchema.optional(),
});

export const ProductFormSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	slug: z.string().optional(),
	discount: z.string().min(0).optional(),
	content: z.string().optional(),
	price: z.string().optional(),
	category: z.string().optional(),
	media: z.array(FileSchema).optional(),
	thumbnail: z.array(FileSchema).optional(),
	variantData: ProductVariantDataSchema.optional(),
	state: ProductStateSchema.optional().catch("draft"),
});
