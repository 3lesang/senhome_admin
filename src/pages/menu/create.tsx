import axiosClient from "@/axios";
import { MenuItem } from "@/components/menu-item";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

const ItemSchema = z.object({
  name: z.string(),
  url: z.string(),
  items: z.array(z.any()),
});

const schema = z.object({
  name: z.string().min(1),
  position: z.string(),
  items: z.array(ItemSchema),
});

type FormValues = z.infer<typeof schema>;

export function MenuCreatePage() {
  const navigate = useNavigate();
  const saveMenuMutation = useMutation({
    mutationFn: async (value: FormValues) => {
      const res = await axiosClient.post<{ id: number }>("/menus", {
        name: value.name,
        position: value.position,
      });
      s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: `menu/${res.data.id}`,
          Body: JSON.stringify(value.items),
          ContentType: "application/json",
        }),
      );
    },
    onSuccess: () => {
      toast.success("Tạo menu thành công");
      navigate({ to: "/store/menu" });
    },
  });

  const defaultValues: FormValues = {
    name: "",
    position: "header",
    items: [],
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveMenuMutation.mutateAsync(value),
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
          <CardTitle>Thêm menu</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-4">
            <Card className="shadow-none border-0">
              <CardContent>
                <form.Field name="name">
                  {(field) => (
                    <Field>
                      <FieldLabel>Tên menu</FieldLabel>
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
                <CardTitle>Liên kết</CardTitle>
                <CardDescription>
                  Danh sách liên kết website , giúp khách hàng chuyển trang
                  trong cửa hàng của bạn. Bạn có thể tạo các menu lồng nhau để
                  hiện thị drop-down menus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form.Field name="items">
                  {(field) => (
                    <MenuItem
                      value={field.state.value}
                      onChange={field.handleChange}
                    />
                  )}
                </form.Field>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4">
            <Card className="border-0 shadow-none">
              <CardContent>
                <form.Field name="position">
                  {(field) => (
                    <Field>
                      <FieldLabel>Vị trí</FieldLabel>
                      <Select
                        onValueChange={field.handleChange}
                        defaultValue={field.state.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Vị trí menu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="header">Header</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
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
            disabled={saveMenuMutation.isPending}
            className="ml-auto"
          >
            {saveMenuMutation.isPending && <Spinner />}
            Lưu
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
