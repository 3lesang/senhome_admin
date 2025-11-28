import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { toast } from "sonner";
import z from "zod";
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
import { FileInput } from "./components/file-input";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  content: z.record(z.string(), z.any()),
  file_url: z.string(),
  file: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof schema>;

export function BlogCreatePage() {
  const navigate = useNavigate();
  const savePageMutation = useMutation({
    mutationFn: async (value: FormValues) => {
      const slug = value.slug || slugify(value.title);
      const res = await axiosClient.post<{ id: number }>("/posts", {
        title: value.title,
        slug,
      });
      s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: `post/content/${res.data.id}`,
          Body: JSON.stringify(value.content),
          ContentType: "application/json",
        }),
      );
      value.file &&
        s3Client.send(
          new PutObjectCommand({
            Bucket: "r2-bucket",
            Key: `post/file/${res.data.id}`,
            Body: value.file,
            ContentType: value.file?.type,
          }),
        );
      return res;
    },
    onSuccess: () => {
      toast("Bài viết đã được tạo thành công!");
      navigate({ to: "/contents/blogs" });
    },
  });

  const defaultValues: FormValues = {
    title: "",
    slug: "",
    content: { type: "doc", content: [] } as JSONContent,
    file_url: "",
  };

  const form = useForm({
    defaultValues,
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
          <CardTitle>Thêm bài viết mới</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Card className="border-0 shadow-none">
              <CardContent className="grid gap-4">
                <form.Field name="title">
                  {(field) => (
                    <Field>
                      <FieldLabel>Tiêu đề bài viết</FieldLabel>
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
          <div className="col-span-4 space-y-4">
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
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Hình đại diện</CardTitle>
              </CardHeader>
              <CardContent>
                <form.Field name="file_url">
                  {(field) => (
                    <FileInput
                      value={field.state.value}
                      onChange={(file) =>
                        field.form.setFieldValue("file", file)
                      }
                    />
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
