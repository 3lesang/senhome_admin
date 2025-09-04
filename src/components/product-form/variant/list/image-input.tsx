import FileInput from "@/components/media/file-input";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const ImageInput = () => {
  return (
    <FileInput
      mode="single"
      // value={data?.image}
      // onChange={(files) => onChange(comboKey, { ...data, image: files })}
      render={({ files, handleOpen, handleRemove }) => {
        if (files.length > 0) {
          return (
            <div className="h-16 w-16 rounded-md overflow-hidden relative group">
              <img
                src={files[0].url}
                alt=""
                className="w-full object-cover aspect-square"
              />
              <Button
                className="hidden group-hover:flex absolute top-0 right-0 size-6 rounded-full"
                variant="secondary"
                size="icon"
                onClick={() => handleRemove?.(files[0].id)}
              >
                <XIcon />
              </Button>
            </div>
          );
        }
        return (
          <Button
            type="button"
            variant="ghost"
            className="border border-dashed size-16 p-8"
            onClick={handleOpen}
          >
            <span className="text-xs text-muted-foreground">Chọn ảnh</span>
          </Button>
        );
      }}
    />
  );
};

export default ImageInput;
