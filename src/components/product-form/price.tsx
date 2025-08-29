import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { NumericFormat } from "react-number-format";

const ProductPriceSection = React.memo(() => {
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle>Giá</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <FormField
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <NumericFormat
                      value={field.value}
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
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khuyến mãi</FormLabel>
                  <FormControl>
                    <NumericFormat
                      value={field.value}
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
  );
});

export default ProductPriceSection;
