import type {
  AttributeDataListType,
  AttributeType,
} from "@/features/product/components/product-form/product-schema";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import AttributeCard from "./attribute-card";

interface AttributesListProps {
  data?: AttributeDataListType;
  onChange?: (data: AttributeDataListType) => void;
}

function AttributesList({ data = {}, onChange }: AttributesListProps) {
  const [attributes, setAttributes] = useState<AttributeDataListType>(data);

  const handleAdd = () => {
    const id = nanoid(4);
    const next: AttributeDataListType = {
      ...attributes,
      [id]: { id, name: "", options: {}, status: "new" },
    };
    setAttributes(next);
    onChange?.(next);
  };

  const handleRemove = (id: string) => {
    const attr = attributes[id];
    const next: AttributeDataListType = {
      ...attributes,
      [id]: { ...attr, status: "removed" },
    };
    setAttributes(next);
    onChange?.(next);
  };

  const handleChange = (attr: AttributeType) => {
    const existing = attributes[attr.id];
    const status = existing?.status === "new" ? "new" : "updated";
    const next: AttributeDataListType = {
      ...attributes,
      [attr.id]: {
        ...attr,
        status,
      },
    };
    setAttributes(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-8">
      {Object.entries(attributes).map(([id, attr]) => (
        <AttributeCard
          key={id}
          data={attr}
          onRemove={handleRemove}
          onChange={handleChange}
        />
      ))}
      <Button type="button" variant="ghost" onClick={handleAdd}>
        <PlusIcon />
        Thêm phân loại
      </Button>
    </div>
  );
}

export default React.memo(AttributesList);
