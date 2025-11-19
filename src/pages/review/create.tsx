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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getCustomersQueryOptions } from "@/queries/customer";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import _ from "lodash";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import z from "zod";

const schema = z.object({
  rating: z.number().max(5).min(1),
  comment: z.string(),
  product_id: z.number(),
  customer_id: z.number(),
  files: z.array(z.instanceof(File)).optional(),
});

type FormValues = z.infer<typeof schema>;

interface ReviewFileProps {
  onChange?: (value: File[]) => void;
}

const ReviewFile = ({ onChange }: ReviewFileProps) => {
  const [files, setFiles] = useState<File[]>([]);
  function handleAddFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.files) return;
    const fileList = Array.from(e.currentTarget.files);
    const mergedFiles = _.unionBy(files, fileList, "name");
    onChange?.(mergedFiles);
    setFiles(mergedFiles);
  }

  function handleRemove(name: string) {
    setFiles((prev) => prev.filter((i) => i.name !== name));
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {files?.map((f) => (
        <div className="aspect-square bg-neutral-50 rounded overflow-hidden relative">
          {f && (
            <img
              src={URL.createObjectURL(f)}
              className="object-contain w-full h-full"
            />
          )}
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="absolute right-2 top-2 rounded-full"
            onClick={() => handleRemove(f.name)}
          >
            <XIcon />
          </Button>
        </div>
      ))}
      <label className="flex items-center justify-center size-24 border border-dashed rounded hover:bg-neutral-50 hover:cursor-pointer">
        <input
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          onChange={handleAddFile}
        />
        <ImagePlusIcon />
      </label>
    </div>
  );
};

export function ReviewCreatePage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/(app)/products/$id/reviews/create" });
  const getCustomersQuery = useQuery(getCustomersQueryOptions());

  const saveRatingMuation = useMutation({
    mutationFn: (value: FormValues) => {
      const formData = new FormData();
      formData.append("rating", value.rating.toString());
      formData.append("comment", value.comment);
      formData.append("customer_id", value.customer_id.toString());
      formData.append("product_id", id);
      value.files?.forEach((f) => formData.append("files", f));
      return axiosClient.post("/reviews", formData);
    },
    onSuccess: () => {
      navigate({ to: "/products/$id/reviews", params: { id } });
    },
  });

  const defaultValues: FormValues = {
    rating: 5,
    comment: "",
    product_id: Number(id),
    customer_id: 0,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveRatingMuation.mutateAsync(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="border-0 shadow-none bg-transparent max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Thêm đánh giá</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-4">
            <Card className="border-0 shadow-none">
              <CardContent className="space-y-4">
                <form.Field name="rating">
                  {(field) => (
                    <Field>
                      <FieldLabel>Đánh giá</FieldLabel>
                      <NumericFormat
                        min={1}
                        max={5}
                        value={field.state.value}
                        customInput={Input}
                        onValueChange={(v) =>
                          field.handleChange(Number(v.value))
                        }
                      />
                    </Field>
                  )}
                </form.Field>
                <form.Field name="comment">
                  {(field) => (
                    <Field>
                      <FieldLabel>Nội dung</FieldLabel>
                      <Textarea
                        className="resize-none"
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
              <CardContent>
                <form.Field name="files">
                  {(field) => (
                    <Field>
                      <FieldLabel>Hình ảnh</FieldLabel>
                      <ReviewFile onChange={field.handleChange} />
                    </Field>
                  )}
                </form.Field>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4">
            <Card className="border-0 shadow-none">
              <CardContent>
                <form.Field name="customer_id">
                  {(field) => (
                    <Field>
                      <FieldLabel>Khách hàng</FieldLabel>
                      <Select
                        onValueChange={(value) =>
                          field.handleChange(Number(value))
                        }
                        defaultValue={field.state.value.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getCustomersQuery.data?.data.data?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
            className="ml-auto"
            disabled={saveRatingMuation.isPending}
          >
            {saveRatingMuation.isPending && <Spinner />}
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
