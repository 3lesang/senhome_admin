import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { SigninFormSchema } from "./schema";
import type { SigninFormType } from "./type";

interface SigninFormProps {
  defaultValues?: SigninFormType;
  onSubmit?: (values: SigninFormType) => void;
  isPending?: boolean;
}

function SigninForm({ defaultValues, onSubmit, isPending }: SigninFormProps) {
  const form = useForm<SigninFormType>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: SigninFormType) => {
    onSubmit?.(values);
  };

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
