import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AttributeDataList } from "@/type";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";

type Option = AttributeDataList[string]["options"][string];

interface OptionInputProps {
  data?: Option;
  onRemove?: (id: string) => void;
  onChange?: (option: Option) => void;
}

const OptionInput = ({ data, onRemove, onChange }: OptionInputProps) => {
  const [name, setName] = useState<string>(data?.name!);
  const [display, setDisplay] = useState(true);

  const handleRemove = () => {
    data?.id && onRemove?.(data.id);
    setDisplay(false);
  };

  const handleChange = (value: string) => {
    setName(value);
    onChange?.({ id: data?.id!, name: value });
  };

  if (!display) return null;
  return (
    <div className="flex items-center gap-2">
      <Input
        value={name}
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
