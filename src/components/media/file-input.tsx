import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import FileModal from "@/components/media/file-modal";
import type { FileType } from "./schema";

function SortableImage({
  file,
  onRemove,
}: {
  file: FileType;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group w-32 aspect-square border rounded-lg overflow-hidden hover:cursor-move"
    >
      <img
        src={file.url}
        alt="preview"
        className="w-full h-full object-cover"
      />
      <Button
        type="button"
        size="icon"
        className="hidden group-hover:flex absolute top-1 right-1 rounded-full bg-white/80 hover:bg-white size-6"
        variant="ghost"
        onClick={() => onRemove(file.id)}
      >
        <XIcon />
      </Button>
    </div>
  );
}

interface FileInputProps {
  value?: FileType[];
  mode?: "single" | "multiple";
  onChange?: (file: FileType[]) => void;
  render?: (data: {
    files: FileType[];
    handleRemove?: (id: string) => void;
    handleOpen?: () => void;
  }) => ReactNode;
}

function FileInput({
  value = [],
  mode = "multiple",
  onChange,
  render,
}: FileInputProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>(value);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleChange = (newFiles: FileType[]) => {
    setFiles(newFiles);
    setOpen(false);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      setFiles((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    onChange?.(files);
  }, [files]);

  return (
    <>
      {mode === "multiple" && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={files.map((f) => f.id)}
            strategy={rectSortingStrategy}
          >
            <div className="inline-flex my-4 flex-wrap gap-2 w-full">
              {files.map((file) => (
                <SortableImage
                  key={file.id}
                  file={file}
                  onRemove={handleRemoveFile}
                />
              ))}
              {render?.({
                files,
                handleRemove: handleRemoveFile,
                handleOpen,
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {mode === "single" &&
        render?.({
          files,
          handleRemove: handleRemoveFile,
          handleOpen,
        })}

      <FileModal
        value={files}
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleChange}
        mode={mode}
      />
    </>
  );
}

export default FileInput;
