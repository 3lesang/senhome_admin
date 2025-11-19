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
import { CATEGORY_QUERY_KEY } from "@/constants";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export function CategoryCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const saveCategoryMutation = useMutation({
    mutationFn: (value: FormValues) => {
      return axiosClient.post("/categories", value);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [CATEGORY_QUERY_KEY, 1, 10] });
      toast("Danh mục đã được tạo thành công!");
      navigate({ to: "/categories" });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveCategoryMutation.mutateAsync(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Thêm danh mục mới</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Card className="border-0 shadow-none">
              <CardContent className="grid gap-4">
                <form.Field name="name">
                  {(field) => (
                    <Field>
                      <FieldLabel>Tên danh mục</FieldLabel>
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
          </div>
          <div className="col-span-4">
            <Card className="border-0 shadow-none">
              <CardContent>
                <form.Field name="slug">
                  {(field) => (
                    <Field>
                      <FieldLabel>Đường dẫn</FieldLabel>
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
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={saveCategoryMutation.isPending}
            className="ml-auto"
          >
            {saveCategoryMutation.isPending && <Spinner />}
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
