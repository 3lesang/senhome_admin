import type { AttributeDataList } from "@/type";
import React from "react";
import AttributeCard, { type AttributeDataChanges } from "./attribute-card";

interface AttributeListProps {
  data?: AttributeDataList;
  onRemove?: (id: string) => void;
  onChange?: (data: AttributeDataChanges) => void;
}

const AttributeList = ({ data, onRemove, onChange }: AttributeListProps) => {
  return Object.values(data ?? {}).map((item) => (
    <AttributeCard
      key={item.id}
      data={item}
      onRemove={onRemove}
      onChange={onChange}
    />
  ));
};

export default React.memo(AttributeList);
