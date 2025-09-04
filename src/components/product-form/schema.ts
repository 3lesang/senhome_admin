import { FileSchema } from "@/components/media/schema";
import type { AttributeDataList, VariantDataList } from "@/type";
import z from "zod";

export const ProductFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  discount: z.string().min(0).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  media: z.array(FileSchema).optional(),
  thumbnail: z.array(FileSchema).optional(),
  state: z.string().optional().catch("draft"),
  attributesChange: z.any().optional(),
  variantsChange: z.any().optional(),
});

export type ProductFormType = z.infer<typeof ProductFormSchema> & {
  attributes?: AttributeDataList;
  variants?: VariantDataList;
};
