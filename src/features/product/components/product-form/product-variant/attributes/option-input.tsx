import type { OptionType } from "@/features/product/components/product-form/product-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";

interface OptionInputProps {
  value?: OptionType;
  onRemove?: (id: string) => void;
  onChange?: (option: OptionType) => void;
}

const OptionInput = ({
  value = { id: "", name: "" },
  onRemove,
  onChange,
}: OptionInputProps) => {
  const [hide, setHide] = useState(false);
  const [option, setOption] = useState<OptionType>(value);

  const handleRemove = () => {
    setHide(true);
    onRemove?.(option.id);
  };

  const handleChange = (value: string) => {
    const newOption = { ...option, name: value };
    setOption(newOption);
    onChange?.(newOption);
  };

  if (hide) return null;

  return (
    <div className="flex items-center gap-2">
      <Input
        value={option.name}
        onChange={(e) => handleChange(e.currentTarget.value)}
        placeholder="Nhập tùy chọn"
      />
      <Button variant="ghost" size="icon" type="button" onClick={handleRemove}>
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default React.memo(OptionInput);
