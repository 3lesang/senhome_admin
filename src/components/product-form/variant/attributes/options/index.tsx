import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { AttributeDataList } from "@/type";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import OptionList from "./option-list";

type Options = AttributeDataList[string]["options"];
type Option = AttributeDataList[string]["options"][string];

interface OptionsProps {
  data: Options;
  onChange?: (changes: {
    updated: Options;
    added: Options;
    removed: Record<string, string>;
    removedAdded?: Record<string, string>;
  }) => void;
}

const Options = ({ data, onChange }: OptionsProps) => {
  const [updatedOptions, setUpdatedOptions] = useState<Options>({});
  const [addedOptions, setAddedOptions] = useState<Options>({});
  const [removedAddedOptions, setRemovedAddedOptions] = useState<
    Record<string, string>
  >({});
  const [removedOptions, setRemovedOptions] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    onChange?.({
      updated: updatedOptions,
      added: addedOptions,
      removed: removedOptions,
      removedAdded: removedAddedOptions,
    });
  }, [updatedOptions, addedOptions, removedOptions]);

  const handleAddOption = useCallback(() => {
    const id = nanoid(4);
    setAddedOptions((prev) => ({
      ...prev,
      [id]: { id, name: "" },
    }));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setUpdatedOptions((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setRemovedOptions((prev) => ({ ...prev, [id]: id }));
  }, []);

  const handleAddedRemove = useCallback((id: string) => {
    setAddedOptions((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setRemovedAddedOptions((prev) => ({ ...prev, [id]: id }));
  }, []);

  const handleUpdate = useCallback((value: Option) => {
    setUpdatedOptions((prev) => ({ ...prev, [value.id]: value }));
  }, []);

  const handleAddedChange = useCallback((value: Option) => {
    setAddedOptions((prev) => ({ ...prev, [value.id]: value }));
  }, []);

  return (
    <div className="grid w-full items-center gap-3">
      <Label>Tùy chọn</Label>
      <OptionList data={data} onRemove={handleRemove} onChange={handleUpdate} />
      <OptionList
        data={addedOptions}
        onRemove={handleAddedRemove}
        onChange={handleAddedChange}
      />
      <Button type="button" variant="outline" onClick={handleAddOption}>
        <PlusIcon />
        Thêm tùy chọn
      </Button>
    </div>
  );
};

Options.displayName = "Options";

export default React.memo(Options);
