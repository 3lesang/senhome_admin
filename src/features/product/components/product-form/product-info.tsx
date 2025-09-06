import Editor from "@/components/editor";

import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const ProductInfoSection = React.memo(() => {
  return (
    <Card className="shadow-none border-0">
      <CardContent className="grid grid-cols-12 gap-8">
        <div className="col-span-12">
          <FormField
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả sản phẩm</FormLabel>
                <FormControl>
                  <Editor content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
});

export default ProductInfoSection;
