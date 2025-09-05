import type {
  VariantDataType,
  VariantType,
} from "@/features/product/components/product-form/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDownIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import ImageInput from "./image-input";

type CombinationRowProps = {
  data?: VariantDataType;
  onChange?: (data: VariantType) => void;
};

function toNumber<T extends string>(field: T, value: string): number | string {
  const numberFields = ["price", "discount", "stock"] as const;
  if (numberFields.includes(field as (typeof numberFields)[number])) {
    return Number(value);
  }
  return value;
}

const CombinationRow = ({ data = {}, onChange }: CombinationRowProps) => {
  const [open, setOpen] = useState(false);

  const optionItems = Object.values(data);

  const [variant, setVariant] = useState(optionItems[0]?.variant);

  const options = useMemo(() => optionItems.map((o) => o.option), [data]);

  const handleChange = (field: string, value: string) => {
    const newVariant = { ...variant, [field]: toNumber(field, value) };
    setVariant(newVariant);
    onChange?.(newVariant);
  };

  return (
    <>
      <TableRow>
        <TableCell className="group">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-6 opacity-0 group-hover:opacity-100"
              onClick={() => setOpen((o) => !o)}
            >
              <ChevronDownIcon />
            </Button>
            {options.map((o) => (
              <Badge key={o.id} variant="outline">
                {o.name}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <ImageInput />
        </TableCell>
        <TableCell>
          <Input
            value={variant?.price}
            onChange={(e) => handleChange("price", e.currentTarget.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            value={variant?.discount}
            onChange={(e) => handleChange("discount", e.currentTarget.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            value={variant?.stock}
            onChange={(e) => handleChange("stock", e.currentTarget.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            value={variant?.sku}
            onChange={(e) => handleChange("sku", e.currentTarget.value)}
          />
        </TableCell>
      </TableRow>

      {open && (
        <>
          {optionItems.map((item) => (
            <TableRow key={item?.option?.id}>
              <TableCell></TableCell>
              <TableCell>
                <Badge variant="outline">{item?.option?.name}</Badge>
              </TableCell>
              <TableCell>
                <Input
                  value={variant?.price}
                  onChange={(e) => handleChange("price", e.currentTarget.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={variant?.discount}
                  onChange={(e) =>
                    handleChange("discount", e.currentTarget.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  value={variant?.stock}
                  onChange={(e) => handleChange("stock", e.currentTarget.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={variant?.sku}
                  onChange={(e) => handleChange("sku", e.currentTarget.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </>
      )}
    </>
  );
};

export default React.memo(CombinationRow);
