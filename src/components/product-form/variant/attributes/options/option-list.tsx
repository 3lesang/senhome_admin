import type { AttributeDataList } from "@/type";
import React from "react";
import OptionInput from "./option-input";

type Options = AttributeDataList[string]["options"];
type Option = AttributeDataList[string]["options"][string];

interface OptionListProps {
  data: Options;
  onChange?: (option: Option) => void;
  onRemove?: (id: string) => void;
}

const OptionList = ({ data, onRemove, onChange }: OptionListProps) => {
  return Object.values(data ?? {}).map((opt) => (
    <OptionInput
      key={opt.id}
      data={opt}
      onRemove={onRemove}
      onChange={onChange}
    />
  ));
};

export default React.memo(OptionList);
