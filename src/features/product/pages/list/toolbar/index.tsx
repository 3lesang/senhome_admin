import { Button } from "@/components/ui/button";
import { usePageList } from "@/features/product/provider/list";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FILTERS = [
  { key: 0, label: "Tất cả", query: "" },
  { key: 1, label: "Đang hoạt động", query: "deleted=null" },
  { key: 2, label: "Bản nháp", query: "deleted!=null" },
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
