import { FileSchema } from "@/components/media/schema";
import z from "zod";

const OptionSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

const AttributeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  options: z.array(OptionSchema).optional(),
});

const VariantFormSchema = z.object({
  id: z.string().optional(),
  image: z.array(FileSchema).optional(),
  price: z.string().optional(),
  discount: z.string().optional(),
  stock: z.string().optional(),
  sku: z.string().optional(),
});

export const ProductFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  discount: z.string().min(0).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  attributes: z.array(AttributeFormSchema).optional(),
  variants: z.record(z.string(), VariantFormSchema).optional(),
  media: z.array(FileSchema).optional(),
  thumbnail: z.array(FileSchema).optional(),
  state: z.string().optional().catch("draft"),
});

export type ProductAttributeFormType = z.infer<typeof AttributeFormSchema>;
export type ProductVariantFormType = z.infer<typeof VariantFormSchema>;
export type ProductFormType = z.infer<typeof ProductFormSchema>;
