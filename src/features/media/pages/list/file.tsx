import { Checkbox } from "@/components/ui/checkbox";
import { usePageList } from "@/features/media/provider/list";
import { cn } from "@/lib/utils";

interface MediaFileProps {
  data?: {
    id?: string;
    url?: string;
  };
}

function MediaFile({ data = { id: "" } }: MediaFileProps) {
  const { hasSelect, setSelected, selected } = usePageList();
  const { id = "", url } = data;

  const isSelected = Boolean(selected?.[id]);

  const handleSelect = () => {
    if (id) {
      setSelected?.((prev) => ({ ...prev, [id]: !isSelected }));
    }
  };

  return (
    <div className="relative">
      <img
        src={url}
        className="object-cover aspect-square w-full select-none"
      ></img>
      {hasSelect && (
        <div
          className={cn(
            "absolute inset-0 hover:cursor-pointer",
            isSelected && "bg-black/20"
          )}
          onClick={handleSelect}
        >
          <Checkbox className="absolute top-1 right-1" checked={isSelected} />
        </div>
      )}
    </div>
  );
}

export default MediaFile;
