import Editor from "@/components/editor";
import FileInput from "@/components/file-input";
import ProductOption from "@/components/product-option";
import ProductVariant from "@/components/product-variant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_COLLECTION, pb } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";

const OptionInputSchema = z.object({
  attribute: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  options: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

export type OptionInputType = z.infer<typeof OptionInputSchema>;

const schema = z.object({
  id: z.string().optional,
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  content: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  variants: z.array(OptionInputSchema).optional(),
});

type ProductFormType = z.infer<typeof schema>;

interface ProductProps {
  defaultValues?: ProductFormType;
  onSubmit?: () => void;
}

function ProductForm({ defaultValues }: ProductProps) {
  const { data: categories } = useQuery({
    queryKey: [CATEGORY_COLLECTION],
    queryFn: () => pb.collection(CATEGORY_COLLECTION).getFullList(),
  });
  const form = useForm<ProductFormType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (values: ProductFormType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12">
                <Card>
                  <CardContent className="grid grid-cols-12 gap-8">
                    <div className="col-span-12">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên sản phẩm</FormLabel>
                            <FormControl>
                              <Input placeholder="Tên sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả sản phẩm</FormLabel>
                            <FormControl>
                              <Editor content={field.value} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Media</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <FileInput
                      mode="multiple"
                      render={({ files, handleOpen }) => {
                        return (
                          <Button
                            variant="ghost"
                            className={cn(
                              "border border-dashed h-32 min-w-32",
                              files.length == 0 && "flex-1"
                            )}
                            onClick={handleOpen}
                          >
                            <PlusIcon />
                          </Button>
                        );
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Giá</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Giá</FormLabel>
                              <FormControl>
                                <NumericFormat
                                  className="bg-white"
                                  thousandSeparator
                                  prefix="đ "
                                  customInput={Input}
                                  onValueChange={(v) => field.onChange(v.value)}
                                  placeholder="đ 0"
                                  inputMode="decimal"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-6">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Khuyến mãi</FormLabel>
                              <FormControl>
                                <NumericFormat
                                  className="bg-white"
                                  prefix="% "
                                  customInput={Input}
                                  placeholder="% "
                                  onValueChange={(v) => field.onChange(v.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="variants"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ProductOption onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <ProductVariant value={form.watch("variants")} />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-12 gap-8 sticky top-28">
              <div className="col-span-12">
                <Card>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="name"
                      render={() => (
                        <FormItem>
                          <FormLabel>Trạng thái</FormLabel>
                          <FormControl>
                            <Select defaultValue="draft">
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">
                                  Đang hoạt động
                                </SelectItem>
                                <SelectItem value="draft">Bản nháp</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12">
                <Card>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh mục</FormLabel>
                          <FormControl>
                            <Select
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories?.map((item) => (
                                  <SelectItem value={item?.id} key={item.id}>
                                    {item?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Ảnh bìa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileInput
                      mode="single"
                      render={({ files, handleOpen, handleRemove }) => {
                        if (files.length > 0) {
                          return (
                            <div className="relative group flex items-center justify-center w-full aspect-square rounded-md overflow-hidden">
                              <img
                                src={files[0].url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 bg-white size-6"
                                onClick={() => handleRemove?.(files[0].id)}
                              >
                                <XIcon />
                              </Button>
                            </div>
                          );
                        }
                        return (
                          <Button
                            variant="ghost"
                            className="w-full border border-dashed h-80"
                            onClick={handleOpen}
                          >
                            <span>Ảnh bìa</span>
                            <PlusIcon />
                          </Button>
                        );
                      }}
                    ></FileInput>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-12 text-right">
            <Button>Lưu</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
