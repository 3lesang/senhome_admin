import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pb } from "@/lib/pocketbase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type SigninType = z.infer<typeof formSchema>;

function SigninForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: SigninType) =>
      pb
        .collection("_superusers")
        .authWithPassword(values.email, values.password),
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });
  const handleSubmit = (values: SigninType) => {
    mutate(values);
  };

  const form = useForm<SigninType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input
                  placeholder="@aaa@mail.com"
                  {...field}
                  className="px-4 py-2 border rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <input
                  placeholder="Mật khẩu"
                  {...field}
                  type="password"
                  className="px-4 py-2 border rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
          {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}

export default SigninForm;
