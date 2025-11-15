import { Button } from "@/components/ui/button";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface FileInputProps {
  value?: string;
  onChange?: (value: File) => void;
}

export function FileInput({ onChange, value }: FileInputProps) {
  const [file, setFile] = useState<File>();
  const src = file ? URL.createObjectURL(file) : value;
  if (src) {
    return (
      <div className="w-full aspect-square rounded overflow-hidden bg-neutral-50 relative">
        <img src={src} className="w-full h-full object-contain" />
        <Button
          type="button"
          variant="outline"
          className="absolute top-2 right-2 rounded-full"
          size="icon-sm"
          onClick={() => setFile(undefined)}
        >
          <XIcon />
        </Button>
      </div>
    );
  }
  return (
    <label className="flex items-center justify-center aspect-square border border-dashed w-full rounded">
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const [file] = e.currentTarget.files ?? [];
          onChange?.(file);
          setFile(file);
        }}
      />
      <ImagePlusIcon />
    </label>
  );
}
