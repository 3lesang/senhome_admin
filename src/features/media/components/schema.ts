import z from "zod";

export const FileSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export type FileType = z.infer<typeof FileSchema>;
