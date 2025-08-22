import type { OptionInputType } from "@/components/product-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface OptionInputProps {
  value?: OptionInputType;
  onChange?: (value: OptionInputType) => void;
}

function OptionInput({ value, onChange }: OptionInputProps) {
  const [attribute, setAttribute] = useState(value?.attribute);

  const data = new Map();
  for (const option of value?.options ?? []) {
    data.set(option.id, option);
  }

  const id = nanoid(4);
  data.set(id, { id, name: "" });

  const [options, setOptions] =
    useState<Map<string, { id: string; name: string }>>(data);

  const lastKeyMap = Array.from(options.keys()).at(-1);

  const handleAttributeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.currentTarget?.value;
    setAttribute((prev) => ({
      id: prev?.id as string,
      name: value,
    }));
  };

  const handleOptionsChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.currentTarget?.value;
    setOptions((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, {
        id: key,
        name: value,
      });
      if (key == lastKeyMap) {
        const id = nanoid(4);
        newMap.set(id, { id, name: "" });
      }
      return newMap;
    });
  };

  const handleOptionsDelete = (key: string) => {
    setOptions((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  useEffect(() => {
    const newMap = new Map(options);
    if (lastKeyMap) {
      newMap.delete(lastKeyMap);
    }

    onChange?.({
      attribute: {
        id: attribute?.id ?? "",
        name: attribute?.name ?? "",
      },
      options: Array.from(newMap.values()),
    });
  }, [attribute, options, lastKeyMap]);

  return (
    <div>
      <div className="space-y-1">
        <Label>Tên phân loại</Label>
        <Input
          value={attribute?.name}
          className="bg-white"
          onChange={handleAttributeChange}
          placeholder="Nhập phân loại"
        />
      </div>
      <div className="space-y-1 mt-4">
        <Label>Tùy chọn</Label>
        <div className="grid grid-cols-2 gap-2">
          {Array.from(options.values())?.map((item) => (
            <div className="flex items-center" key={item?.id}>
              <Input
                value={item?.name}
                placeholder="Nhập"
                className="bg-white"
                onChange={(event) => handleOptionsChange(item?.id, event)}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className={cn(
                  "text-gray-400 hover:text-gray-700 size-8",
                  item.id == lastKeyMap && "opacity-0"
                )}
                onClick={() => handleOptionsDelete(item?.id)}
              >
                <Trash2Icon size={12} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductOptionProps {
  onChange?: (values: OptionInputType[]) => void;
}

function ProductOption({ onChange }: ProductOptionProps) {
  const [variants, setVariants] = useState<Map<string, OptionInputType>>(
    () => new Map()
  );

  const handleAddVariant = () => {
    setVariants((prev) => {
      const newMap = new Map(prev);
      const id = nanoid(4);
      newMap.set(id, {
        attribute: { id, name: "" },
        options: [],
      });
      return newMap;
    });
  };

  const handleRemoveVariant = (key: string) => {
    setVariants((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  const handleVariantChange = (key: string, value: OptionInputType) => {
    setVariants((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  };

  useEffect(() => {
    const values = Array.from(variants.values());
    onChange?.(values);
  }, [variants]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân loại</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from(variants.entries()).map(([id], index) => {
          return (
            <Card className="bg-gray-50" key={id}>
              <CardHeader>
                <CardTitle>Phân loại {index + 1}</CardTitle>
                <CardAction>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="size-8"
                    onClick={() => handleRemoveVariant(id)}
                  >
                    <XIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="text-center">
                <OptionInput
                  value={{
                    attribute: { id, name: "" },
                  }}
                  onChange={(value) => {
                    handleVariantChange(id, value);
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
        <Card className="bg-gray-50">
          <CardContent className="text-center">
            <Button type="button" variant="outline" onClick={handleAddVariant}>
              Thêm phân loại
              <PlusIcon />
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default ProductOption;
