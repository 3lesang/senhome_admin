import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function PageListSearchInput({ onSearch }: { onSearch?: (q: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  }, 500);

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
      >
        <SearchIcon />
      </Button>

      {open && (
        <Input
          placeholder="Tìm kiếm..."
          className="bg-white w-56"
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      )}
    </div>
  );
}

export default PageListSearchInput;
