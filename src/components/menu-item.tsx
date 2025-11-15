import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

export type Item = {
  name: string;
  url: string;
  items: Item[];
};

interface MenuItemProps {
  value?: Item[];
  onChange?: (value: Item[]) => void;
}

export function MenuItem({ value, onChange }: MenuItemProps) {
  const [items, setItems] = useState<Item[]>(value ?? []);

  const handleAdd = () => {
    const newItems = [...items, { name: "", url: "", items: [] }];
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleItemChange = (index: number, newItem: Item) => {
    const newItems = items.map((it, i) => (i === index ? newItem : it));
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleItemRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange?.(newItems);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <MenuItemRow
          key={index}
          item={item}
          onChange={(newItem) => handleItemChange(index, newItem)}
          onRemove={() => handleItemRemove(index)}
        />
      ))}

      <Button type="button" variant="outline" onClick={handleAdd}>
        <PlusIcon className="mr-2" />
        Thêm liên kết
      </Button>
    </div>
  );
}

type Props = {
  item: Item;
  onChange: (item: Item) => void;
  onRemove: () => void;
};

export function MenuItemRow({ item, onChange, onRemove }: Props) {
  const handleAddNested = () => {
    onChange({
      ...item,
      items: [...item.items, { name: "", url: "", items: [] }],
    });
  };

  const handleFieldChange = (field: keyof Item, value: string) => {
    onChange({ ...item, [field]: value });
  };

  const handleNestedChange = (index: number, newItem: Item) => {
    const newItems = item.items.map((it, i) => (i === index ? newItem : it));
    onChange({ ...item, items: newItems });
  };

  const handleRemoveNested = (index: number) => {
    const newItems = item.items.filter((_, i) => i !== index);
    onChange({ ...item, items: newItems });
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md shadow-xs">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Tên liên kết"
          value={item.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <Input
          placeholder="Liên kết"
          value={item.url}
          onChange={(e) => handleFieldChange("url", e.target.value)}
        />
        <Button type="button" size="icon-sm" variant="ghost" onClick={onRemove}>
          <Trash2Icon />
        </Button>
      </div>
      {item.items.map((nested, index) => (
        <div key={index} className="ml-6">
          <MenuItemRow
            item={nested}
            onChange={(newItem) => handleNestedChange(index, newItem)}
            onRemove={() => handleRemoveNested(index)}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="ml-6"
        onClick={handleAddNested}
      >
        <PlusIcon className="mr-2" />
      </Button>
    </div>
  );
}
