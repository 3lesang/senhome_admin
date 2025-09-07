import type {
  AttributeType,
  OptionsType,
} from "@/features/product/components/product-form/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import Options from "./options";

interface AttributeCardProps {
  data: AttributeType;
  onRemove?: (id: string) => void;
  onChange?: (data: AttributeType) => void;
}

function AttributeCard({ data, onRemove, onChange }: AttributeCardProps) {
  const [hide, setHide] = useState(false);
  const [attr, setAttr] = useState<AttributeType>(data);

  const handleRemove = () => {
    setHide(true);
    onRemove?.(attr.id);
  };

  const handleChange = (
    type: "name" | "options",
    value: string | OptionsType
  ) => {
    const next: AttributeType =
      type === "name"
        ? { ...attr, name: value as string }
        : { ...attr, options: value as OptionsType };

    setAttr(next);
    onChange?.(next);
  };

  if (hide) return null;

  return (
    <Card className="shadow-none border-0">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{attr.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={handleRemove}
        >
          <XIcon />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Tên loại</Label>
          <Input
            value={attr.name}
            onChange={(e) => handleChange("name", e.currentTarget.value)}
            placeholder="Tên loại (vd: Kích thước, Màu sắc)"
          />
        </div>
        <Options
          data={attr.options}
          onChange={(data) => handleChange("options", data)}
        />
      </CardContent>
    </Card>
  );
}

export default React.memo(AttributeCard);
