import axiosClient from "@/axios";
import { TextEditor } from "@/components/text-editor";
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
import { slugify } from "@/lib/utils";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string(),
  content: z.record(z.string(), z.any()),
});

type FormValues = z.infer<typeof schema>;

export function StorePageCreatePage() {
  const navigate = useNavigate();
  const savePageMutation = useMutation({
    mutationFn: async (value: FormValues) => {
      const slug = value.slug || slugify(value.name);
      const res = await axiosClient.post<{ id: number }>("/pages", {
        name: value.name,
        slug,
      });
      s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: `page/${res.data.id}`,
          Body: JSON.stringify(value.content),
          ContentType: "application/json",
        }),
      );
      return res;
    },
    onSuccess: () => {
      toast("Trang đã được tạo thành công!");
      navigate({ to: "/stores/pages" });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      content: { type: "doc", content: [] } as JSONContent,
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => savePageMutation.mutateAsync(value),
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
          <CardTitle>Thêm trang mới</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Card className="border-0 shadow-none">
              <CardContent className="grid gap-4">
                <form.Field name="name">
                  {(field) => (
                    <Field>
                      <FieldLabel>Tiêu đề trang</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.currentTarget.value)
                        }
                      />
                    </Field>
                  )}
                </form.Field>
                <form.Field name="content">
                  {(field) => (
                    <Field>
                      <FieldLabel>Nội dung</FieldLabel>
                      <TextEditor
                        value={field.state.value}
                        onChange={field.handleChange}
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
            disabled={savePageMutation.isPending}
            className="ml-auto"
          >
            {savePageMutation.isPending && <Spinner />}
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
