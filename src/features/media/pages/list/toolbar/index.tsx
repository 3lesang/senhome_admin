import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderIcon } from "lucide-react";
import { useState } from "react";

const FILTERS = [
  { key: 0, label: "Tất cả", query: "" },
  { key: 1, label: "Sản phẩm", query: "deleted=null" },
  { key: 2, label: "Banner", query: "deleted!=null" },
];

function ListPageToolbar() {
  const [type, setType] = useState<number>(0);

  const handleFilterClick = (key: number, q: string) => {
    console.log(q);
    setType(key);
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
            <FolderIcon />
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ListPageToolbar;
