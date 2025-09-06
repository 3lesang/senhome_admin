import z from "zod";

const filterSchema = z.object({
  state: z.enum(["all", "publish", "unpublish"]).optional().catch("all"),
});

export const schema = z.object({
  page: z.number().catch(1).optional(),
  limit: z.number().catch(20).optional(),
  filter: filterSchema.catch({ state: "all" }).optional(),
  sort: z.enum(["newest", "oldest", "price"]).optional(),
});

export type FilterType = z.infer<typeof filterSchema>;
