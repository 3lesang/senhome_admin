import { Button } from "@/components/ui/button";
import { usePageList } from "@/features/order/provider/list";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FILTERS = [
  { key: 0, label: "Tất cả", query: "" },
  { key: 1, label: "Đơn mới", query: "" },
  { key: 3, label: "Đã hoàn thành", query: "" },
  { key: 4, label: "Đã hủy", query: "" },
];

function ListPageToolbar() {
  const { setQuery } = usePageList();
  const [type, setType] = useState<number>(0);

  const handleFilterClick = (key: number, filterQuery: string) => {
    setType(key);
    setQuery(filterQuery);
  };

  return (
    <div className="space-y-4">
      <div className="flex">
        {FILTERS.map((filter) => (
          <Button
            key={filter.key}
            type="button"
            variant="ghost"
            onClick={() => handleFilterClick(filter.key, filter.query)}
            className={cn(type === filter.key && "bg-gray-100")}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ListPageToolbar;
