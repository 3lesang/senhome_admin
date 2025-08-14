import Editor from "@/components/editor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";
import type { Product } from "@/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDownIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const productQueryOptions = (id: string) =>
  queryOptions<Product>({
    queryKey: [PRODUCT_COLLECTION, id],
    queryFn: () => pb.collection(PRODUCT_COLLECTION).getOne(id),
  });

export const Route = createFileRoute("/(app)/product/$id")({
  component: RouteComponent,
  beforeLoad(ctx) {
    return ctx.context.queryClient.ensureQueryData(
      productQueryOptions(ctx.params.id)
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(productQueryOptions(id));

  const form = useForm();
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-end">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/product">Sản phẩm</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{data?.name}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            Xem <EyeIcon />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Thêm
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <TrashIcon />
                Xóa sản phẩm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4 gap-8">
        <Form {...form}>
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
                              <input
                                placeholder="Tên sản phẩm"
                                {...field}
                                className="px-4 py-2 border rounded-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12">
                      <FormField
                        control={form.control}
                        name="description"
                        render={() => (
                          <FormItem>
                            <FormLabel>Mô tả sản phẩm</FormLabel>
                            <FormControl>
                              <Editor />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-12">
                      <FormField
                        control={form.control}
                        name="name"
                        render={() => (
                          <FormItem>
                            <FormLabel>Danh mục</FormLabel>
                            <FormControl>
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="light">Light</SelectItem>
                                  <SelectItem value="dark">Dark</SelectItem>
                                  <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                              </Select>
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
                    <CardTitle>Giá</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="name"
                      render={() => (
                        <FormItem>
                          <FormLabel>Giá</FormLabel>
                          <FormControl>
                            <Input />
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
                    <CardTitle>Giá</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="name"
                      render={() => (
                        <FormItem>
                          <FormLabel>Giá</FormLabel>
                          <FormControl>
                            <Input />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-12 gap-8">
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
                  <CardHeader>
                    <CardTitle>Hình ảnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center items-center h-32 bg-gray-50 border border-dashed rounded-lg hover:border-gray-400 hover:cursor-pointer">
                      <div className="text-center">
                        <Button variant="outline">Thêm hình</Button>
                        <p className="text-sm">chèn hình vào đây</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="col-span-12 text-right">
            <Button>Lưu</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
