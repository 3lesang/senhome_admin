import { FileSchema } from "@/components/file-input/schema";
import { PRODUCT_STATE } from "@/features/product/constants";
import z from "zod";

export const StatusSchema = z.enum(["new", "updated", "removed", "unchanged"]);
export const ProductStateSchema = z.enum(
  Object.values(PRODUCT_STATE).map((s) => s.value) as [string, ...string[]]
);

export const withStatus = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  schema.extend({ status: StatusSchema.optional() });

export const OptionSchema = withStatus(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const OptionsSchema = z.record(z.string(), OptionSchema);

export const AttributeSchema = withStatus(
  z.object({
    id: z.string(),
    name: z.string(),
    options: OptionsSchema,
  })
);

export const VariantSchema = withStatus(
  z.object({
    id: z.string(),
    price: z.number().nonnegative(),
    discount: z.number().min(0).max(100),
    stock: z.number().nonnegative(),
    sku: z.string(),
    image: z.array(FileSchema).optional(),
  })
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
