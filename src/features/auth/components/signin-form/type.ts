import type z from "zod";
import type { SigninFormSchema } from "./schema";

export type SigninFormType = z.infer<typeof SigninFormSchema>;
