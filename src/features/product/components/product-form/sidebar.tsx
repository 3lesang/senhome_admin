import FileInput from "@/features/media/components/file-input";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productCategoryQueryOptions } from "@/lib/pocketbase";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon, XIcon } from "lucide-react";
import React from "react";

const ProductSidebar = React.memo(() => {
  const { data: categories } = useSuspenseQuery(productCategoryQueryOptions());

  return (
    <div className="grid grid-cols-12 gap-8 sticky top-8">
      <div className="col-span-12">
        <Card className="shadow-none border-0">
          <CardContent>
            <FormField
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">Đang hoạt động</SelectItem>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12">
        <Card className="shadow-none border-0">
          <CardContent>
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((item) => (
                        <SelectItem value={item?.id} key={item.id}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12">
        <Card className="shadow-none border-0">
          <CardHeader>
            <CardTitle>Ảnh bìa</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileInput
                      value={field.value}
                      mode="single"
                      render={({ files, handleOpen, handleRemove }) =>
                        files.length > 0 ? (
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
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full border border-dashed h-80"
                            onClick={handleOpen}
                          >
                            <span>Ảnh bìa</span>
                            <PlusIcon />
                          </Button>
                        )
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default ProductSidebar;
