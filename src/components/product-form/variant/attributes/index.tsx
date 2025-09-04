import { Button } from "@/components/ui/button";
import type { AttributeDataList } from "@/type";
import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import type { AttributeDataChanges } from "./attribute-card";
import AttributeList from "./attribute-list";

export interface AttributesDataChange {
  updatedAttributes: Record<string, AttributeDataChanges>;
  addedAttributes: AttributeDataList;
  removedAttributes: Record<string, string>;
  removedAddedAttributes?: Record<string, string>;
}

interface AttributesProps {
  data: AttributeDataList;
  onChange?: (data: AttributesDataChange) => void;
}

function Attributes({ data, onChange }: AttributesProps) {
  const [updatedAttributes, setUpdatedAttributes] = useState<
    Record<string, AttributeDataChanges>
  >({});

  const [addedAttributes, setAddedAttributes] = useState<AttributeDataList>({});
  const [addedOptions, setAddedOptions] = useState<AttributeDataList>({});

  const [removedAttributes, setRemovedAttributes] = useState<
    Record<string, string>
  >({});

  const [removedAddedAttributes, setRemovedAddedAttributes] = useState<
    Record<string, string>
  >({});

  const handleAddAttribute = useCallback(() => {
    const id = nanoid(4);
    setAddedAttributes((prev) => ({
      ...prev,
      [id]: {
        id: id,
        name: "",
        options: {},
      },
    }));
  }, []);

  const handleUpdate = useCallback((value: AttributeDataChanges) => {
    setUpdatedAttributes((prev) => {
      const id = value.id as string;
      const item = prev[id];
      return {
        ...prev,
        [id]: { ...item, ...value },
      };
    });
  }, []);

  const handleAddedChange = useCallback((value: AttributeDataChanges) => {
    setAddedOptions((prev) => {
      const id = value.id as string;
      const item = prev[id];
      const newItem: {
        id: string;
        name?: string;
        options?: AttributeDataList[string]["options"];
      } = {
        id,
      };
      if (value.name) {
        newItem.name = value.name;
      }
      if (value.options?.added) {
        newItem.options = value.options.added;
      }

      return {
        ...prev,
        [id]: {
          ...item,
          ...newItem,
        },
      };
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    setRemovedAttributes((prev) => ({ ...prev, [id]: id }));
    setUpdatedAttributes((prev) => {
      const item = prev[id];
      const updateData = data[id];
      const removed: Record<string, string> = Object.fromEntries(
        Object.entries(updateData.options).map(([key, option]) => [
          key,
          option.id,
        ])
      );
      return {
        ...prev,
        [id]: {
          ...item,
          options: {
            removed,
          },
        },
      };
    });
  }, []);

  const handleAddedRemove = useCallback((id: string) => {
    setAddedAttributes((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setAddedOptions((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setRemovedAddedAttributes((prev) => ({ ...prev, [id]: id }));
  }, []);

  useEffect(() => {
    onChange?.({
      updatedAttributes,
      removedAttributes,
      addedAttributes: addedOptions,
      removedAddedAttributes,
    });
  }, [
    updatedAttributes,
    removedAttributes,
    addedOptions,
    removedAddedAttributes,
  ]);

  return (
    <div className="space-y-8">
      <AttributeList
        data={data}
        onRemove={handleRemove}
        onChange={handleUpdate}
      />
      <AttributeList
        data={addedAttributes}
        onRemove={handleAddedRemove}
        onChange={handleAddedChange}
      />
      <Button type="button" variant="ghost" onClick={handleAddAttribute}>
        <PlusIcon />
        Thêm phân loại
      </Button>
    </div>
  );
}

export default React.memo(Attributes);
