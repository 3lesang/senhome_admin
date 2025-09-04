import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AttributeDataList } from "@/type";
import { XIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import Options from "./options";

type Attribute = AttributeDataList[string];

export interface AttributeDataChanges {
  id?: string;
  name?: string;
  options?: {
    added?: Attribute["options"];
    updated?: Attribute["options"];
    removed?: Record<string, string>;
    removedAdded?: Record<string, string>;
  };
}
interface AttributeCardProps {
  data: Attribute;
  onRemove?: (id: string) => void;
  onChange?: (data: AttributeDataChanges) => void;
}

function AttributeCard({ data, onRemove, onChange }: AttributeCardProps) {
  const [display, setDisplay] = useState(true);
  const { id, name: nameData, options } = data;
  const [name, setName] = useState<string>(nameData);

  const handleRemove = () => {
    onRemove?.(id);
    setDisplay(false);
  };

  const handleNameChange = useCallback((value: string) => {
    setName(value);
    onChange?.({
      id,
      name: value,
    });
  }, []);

  const handleOptionsChange = useCallback(
    (changes: {
      updated: Attribute["options"];
      added: Attribute["options"];
      removed: Record<string, string>;
      removedAdded?: Record<string, string>;
    }) => {
      onChange?.({
        id,
        options: {
          added: changes.added,
          removed: changes.removed,
          updated: changes.updated,
          removedAdded: changes.removedAdded,
        },
      });
    },
    []
  );

  if (!display) return null;
  return (
    <Card className="shadow-none border-0">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{name}</CardTitle>
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
            value={name}
            onChange={(e) => handleNameChange(e.currentTarget.value)}
            placeholder="Tên loại (vd: Kích thước, Màu sắc)"
          />
        </div>
        <Options data={options} onChange={handleOptionsChange} />
      </CardContent>
    </Card>
  );
}

export default React.memo(AttributeCard);
