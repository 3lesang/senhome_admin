import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { FileType } from "@/features/file/types";
import type {
  VariantDataType,
  VariantType,
} from "@/features/product/components/form/schema";
import { ChevronDownIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import ImageInput from "./image-input";
import { parseValue } from "../../parseValue";
import VariantField from "./variant-field";

interface CombinationRowProps {
  data?: VariantDataType;
  onChange?: (data: VariantType) => void;
}

const ComboRow = ({ data = {}, onChange }: CombinationRowProps) => {
  const [open, setOpen] = useState(false);

  const optionItems = Object.values(data);
  const [variant, setVariant] = useState<VariantType>(
    optionItems[0]?.variant ?? {
      id: "",
      price: 0,
      discount: 0,
      stock: 0,
      sku: "",
      image: [],
    }
  );

  const options = useMemo(() => optionItems.map((o) => o.option), [data]);

  const handleChange = (field: keyof VariantType, value: string) => {
    const newVariant: VariantType = {
      ...variant,
      [field]: parseValue(field, value),
    };
    setVariant(newVariant);
    onChange?.(newVariant);
  };

  const handleImageChange = (data: FileType[]) => {
    const newVariant: VariantType = { ...variant, image: data };
    setVariant(newVariant);
    onChange?.(newVariant);
  };

  const renderVariantCells = () => (
    <>
      <TableCell>
        <VariantField field="price" variant={variant} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <VariantField
          field="discount"
          variant={variant}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <VariantField field="stock" variant={variant} onChange={handleChange} />
      </TableCell>
      <TableCell>
        <VariantField field="sku" variant={variant} onChange={handleChange} />
      </TableCell>
    </>
  );

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
          <ImageInput data={variant.image} onChange={handleImageChange} />
        </TableCell>
        {renderVariantCells()}
      </TableRow>

      {open &&
        optionItems.map((item) => (
          <TableRow key={item?.option?.id}>
            <TableCell></TableCell>
            <TableCell>
              <Badge variant="outline">{item?.option?.name}</Badge>
            </TableCell>
            {renderVariantCells()}
          </TableRow>
        ))}
    </>
  );
};

export default React.memo(ComboRow);
