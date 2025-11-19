import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import z from "zod";

const schema = z.object({
  name: z.string(),
  phone: z.string(),
  password: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function CustomerCreatePage() {
  const navigate = useNavigate();
  const saveCustomerMuation = useMutation({
    mutationFn: (value: FormValues) => {
      return axiosClient.post("/customers", value);
    },
    onSuccess: () => {
      navigate({ to: "/customers" });
    },
  });

  const defaultValues: FormValues = {
    name: "",
    phone: "",
    password: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveCustomerMuation.mutateAsync(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="border-0 shadow-none bg-transparent max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Thêm khách hàng</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <Card className="border-0 shadow-none col-span-12">
            <CardContent className="grid grid-cols-12 gap-4">
              <form.Field name="name">
                {(field) => (
                  <Field className="col-span-6">
                    <FieldLabel>Tên khách hàng</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.currentTarget.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="phone">
                {(field) => (
                  <Field className="col-span-6">
                    <FieldLabel>Số điện thoại</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.currentTarget.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="password">
                {(field) => (
                  <Field className="col-span-12">
                    <FieldLabel>Mật khẩu</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.currentTarget.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="ml-auto"
            disabled={saveCustomerMuation.isPending}
          >
            {saveCustomerMuation.isPending && <Spinner />}
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
