import FileInput from "@/components/file-input";
import type { FileMap } from "@/components/file-modal";
import type { OptionInputType } from "@/components/product-form";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateVariants } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Badge } from "./ui/badge";

type ProductVariantType = {
  image?: FileMap;
  price?: string;
  discount?: string;
  stock?: string;
  sku?: string;
  variants?: {
    attribute:
      | {
          id: string;
          name: string;
        }
      | undefined;
    option: {
      id: string;
      name: string;
    };
  }[];
};

interface ProductVariantProps {
  value?: OptionInputType[];
}

function makeKey(options: { id: string; name: string }[]) {
  return options
    .map((o) => o.id)
    .sort()
    .join("-");
}

function ProductVariant({ value }: ProductVariantProps) {
  const data = generateVariants(value);

  const [variants, setVariants] = useState<Map<string, ProductVariantType>>(
    new Map()
  );

  const handleValueChange = (
    key: string,
    field: string,
    value: string | FileMap | null
  ) => {
    const newMap = new Map(variants);
    const item = newMap.get(key);
    newMap.set(key, {
      ...item,
      [field]: value,
    });
    setVariants(newMap);
  };

  useEffect(() => {
    if (!data?.length) return;
    const map = new Map<string, ProductVariantType>();

    data.forEach((combination) => {
      console.log(combination);
      const key = makeKey(combination.map((item) => item.option));
      if (key) {
        map.set(key, {
          variants: combination,
        });
      }
    });
    setVariants(map);
  }, [value]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách phân loại</CardTitle>
        <CardAction></CardAction>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Phân loại</TableHead>
            <TableHead className="w-24">Hình ảnh</TableHead>
            <TableHead>Giá sản phẩm</TableHead>
            <TableHead>Khuyến mãi</TableHead>
            <TableHead>Kho hàng</TableHead>
            <TableHead className="text-right">SKU phân loại</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(variants.entries()).map(([id, item]) => (
            <TableRow key={id}>
              <TableCell className="space-x-1">
                {item.variants?.map((item) => (
                  <Badge variant="secondary">{item.option.name}</Badge>
                ))}
              </TableCell>
              <TableCell>
                <FileInput
                  mode="single"
                  onChange={(files) => {
                    handleValueChange(id, "image", files[0]);
                  }}
                  render={({ handleOpen }) => {
                    return (
                      <button
                        className="text-sm text-gray-600 flex items-center justify-center size-20 border border-dashed rounded-lg bg-white"
                        onClick={handleOpen}
                      >
                        <span>Hình ảnh</span>
                      </button>
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <NumericFormat
                  className="bg-white"
                  value={item.price}
                  thousandSeparator
                  prefix="đ "
                  customInput={Input}
                  onValueChange={(v) => handleValueChange(id, "price", v.value)}
                  placeholder="đ 0"
                  inputMode="decimal"
                />
              </TableCell>
              <TableCell>
                <NumericFormat
                  className="bg-white"
                  value={item.discount}
                  prefix="% "
                  customInput={Input}
                  placeholder="% "
                  onValueChange={(v) => {
                    handleValueChange(id, "discount", v.value);
                  }}
                />
              </TableCell>
              <TableCell className="">
                <Input
                  placeholder="Nhập"
                  className="bg-white"
                  type="number"
                  value={item.stock}
                  onChange={(event) => {
                    handleValueChange(id, "stock", event.currentTarget.value);
                  }}
                />
              </TableCell>
              <TableCell className="">
                <Input
                  type="text"
                  placeholder="Nhập SKU"
                  className="bg-white"
                  value={item.sku}
                  onChange={(event) => {
                    handleValueChange(id, "sku", event.currentTarget.value);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default ProductVariant;
