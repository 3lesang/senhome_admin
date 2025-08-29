import { FileSchema } from "@/components/media/schema";
import z from "zod";
import type { CombinationDetails, SectionType } from "./variant";

export const ProductFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  discount: z.string().min(0).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  attributes: z.array(z.any()).optional(),
  variants: z.record(z.string(), z.any()).optional(),
  media: z.array(FileSchema).optional(),
  thumbnail: z.array(FileSchema).optional(),
  state: z.string().optional().catch("draft"),
});

export type ProductFormType = z.infer<typeof ProductFormSchema> & {
  attributes?: SectionType[];
  variants?: CombinationDetails;
};
