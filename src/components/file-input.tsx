import { XIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import FileModal, { type FileMap } from "./file-modal";
import { Button } from "./ui/button";

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

type FileEntry = [string, FileMap];

function SortableImage({
  entry,
  onRemove,
}: {
  entry: FileEntry;
  onRemove: (key: string) => void;
}) {
  const [key, item] = entry;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: key });

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
        src={item.url}
        alt="preview"
        className="w-full h-full object-cover"
      />
      <Button
        type="button"
        size="icon"
        className="hidden group-hover:flex absolute top-1 right-1 rounded-full bg-white/80 hover:bg-white size-6"
        variant="ghost"
        onClick={() => onRemove(key)}
      >
        <XIcon />
      </Button>
    </div>
  );
}

interface FileInputProps {
  mode?: "single" | "multiple";
  onChange?: (file: FileMap[]) => void;
  render?: (data: {
    files: FileMap[];
    handleRemove?: (key: string) => void;
    handleOpen?: () => void;
  }) => ReactNode;
}

function FileInput({ mode = "multiple", onChange, render }: FileInputProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(new Map<string, FileMap>());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleChange = () => {
    const values = Array.from(files.values());
    onChange?.(values);
  };

  const handleAddFile = (newFiles: Map<string, FileMap>) => {
    if (mode == "single") {
      setFiles(() => {
        const updated = new Map();
        newFiles.forEach((value, key) => {
          updated.set(key, value);
        });
        return updated;
      });
    }
    if (mode == "multiple") {
      setFiles((prev) => {
        const updated = new Map(prev);
        newFiles.forEach((value, key) => {
          updated.set(key, value);
        });
        return updated;
      });
    }

    setOpen(false);
  };

  const handleRemoveFile = (key: string) => {
    setFiles((prev) => {
      const updated = new Map(prev);
      updated.delete(key);
      return updated;
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const entries = Array.from(files.entries());
      const oldIndex = entries.findIndex(([k]) => k === active.id);
      const newIndex = entries.findIndex(([k]) => k === over.id);
      const newEntries = arrayMove(entries, oldIndex, newIndex);
      setFiles(new Map(newEntries));
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleChange();
  }, [files]);

  return (
    <>
      {mode == "multiple" && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={Array.from(files.keys())}
            strategy={rectSortingStrategy}
          >
            <div className="inline-flex my-4 flex-wrap gap-2 w-full">
              {Array.from(files.entries()).map((entry) => (
                <SortableImage
                  key={entry[0]}
                  entry={entry}
                  onRemove={handleRemoveFile}
                />
              ))}
              {render?.({
                files: Array.from(files.values()),
                handleRemove: handleRemoveFile,
                handleOpen,
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {mode == "single" && (
        <>
          {render?.({
            files: Array.from(files.values()),
            handleRemove: handleRemoveFile,
            handleOpen,
          })}
        </>
      )}

      <FileModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleAddFile}
        mode={mode}
      />
    </>
  );
}

export default FileInput;
