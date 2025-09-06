import z from "zod";

export const SigninFormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
