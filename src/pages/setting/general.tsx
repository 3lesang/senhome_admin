import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getStoreQueryOptions } from "@/queries/store";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

export type FormValues = z.infer<typeof schema>;

export function StoreSettingsGeneral() {
  const getStoreQuery = useSuspenseQuery(getStoreQueryOptions());

  const saveMutation = useMutation({
    mutationFn: (value: FormValues) => {
      return s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: "store",
          Body: JSON.stringify(value),
          ContentType: "application/json",
        }),
      );
    },
    onSuccess: () => {
      toast.success("Update success");
    },
  });
  const form = useForm({
    defaultValues: {
      name: getStoreQuery.data.data.name ?? "",
      description: getStoreQuery.data.data.description ?? "",
      email: getStoreQuery.data.data.email ?? "",
      phone: getStoreQuery.data.data.phone ?? "",
      address: getStoreQuery.data.data.address ?? "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveMutation.mutateAsync(value),
    onSubmitInvalid: ({ formApi }) => {
      console.log(formApi.getAllErrors());
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="bg-sidebar border-0 shadow-none max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Cấu hình cửa hàng</CardTitle>
          <CardDescription>
            Cấu hình thông tin chung của cửa hàng
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Thông tin cửa hàng</CardTitle>
              <CardDescription>
                Tên cửa hàng xuất hiện trên cửa hàng của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-12 gap-8">
              <form.Field name="name">
                {(field) => (
                  <Field className="col-span-12">
                    <FieldLabel>Tên cửa hàng</FieldLabel>
                    <Input
                      placeholder="Tên cửa hàng"
                      type="text"
                      className="bg-white"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.currentTarget.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="email">
                {(field) => (
                  <Field className="col-span-6">
                    <FieldLabel>Tài khoản email</FieldLabel>
                    <Input
                      placeholder="Email"
                      type="email"
                      className="bg-white"
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
                      placeholder="Số điện thoại"
                      type="tel"
                      className="bg-white"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.currentTarget.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="description">
                {(field) => (
                  <Field className="col-span-12">
                    <FieldLabel>Mô tả trang</FieldLabel>
                    <Textarea
                      placeholder="Mô tả trang"
                      className="bg-white resize-none"
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
              <CardTitle>Nhận dạng thương hiệu</CardTitle>
              <CardDescription>
                Nơi quản lý tất cả các tài sản liên quan đến thương hiệu của cửa
                hàng, giúp đảm bảo tất cả những nơi sử dụng dữ liệu này đều có
                sự nhất quán về hình ảnh và nội dung.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Địa chỉ cửa hàng</CardTitle>
              <CardDescription>
                Địa chỉ này sẽ xuất hiện trên hoá đơn của bạn và sẽ được sử dụng
                để tính toán mức giá vận chuyển của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-12 gap-4">
              <form.Field name="address">
                {(field) => (
                  <Field className="col-span-12">
                    <FieldLabel>Địa chỉ</FieldLabel>
                    <Input
                      placeholder="Địa chỉ"
                      type="text"
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
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending && <Spinner />}
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
