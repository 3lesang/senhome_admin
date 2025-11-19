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
import {
  getPageContentQueryOptions,
  getPageQueryOptions,
} from "@/queries/page";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string(),
  content: z.record(z.string(), z.any()),
});

type FormValues = z.infer<typeof schema>;

export function StorePageUpdatePage() {
  const { id } = useParams({ from: "/(app)/stores/pages/$id" });
  const getPageQuery = useSuspenseQuery(getPageQueryOptions(id));
  const getPageContentQuery = useSuspenseQuery(getPageContentQueryOptions(id));
  const savePageMutation = useMutation({
    mutationFn: (value: FormValues) => {
      s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: `page/${id}`,
          Body: JSON.stringify(value.content),
          ContentType: "application/json",
        }),
      );
      return axiosClient.put(`/pages/${id}`, value);
    },
    onSuccess: () => {
      toast.success("Cập nhật trang thành công");
      getPageQuery.refetch();
    },
  });

  const form = useForm({
    defaultValues: {
      name: getPageQuery.data.data.name,
      slug: getPageQuery.data.data.slug,
      content: getPageContentQuery.data.data,
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
          <CardTitle>{getPageQuery.data.data.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Card className="border-0 shadow-none">
              <CardContent className="space-y-4">
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
