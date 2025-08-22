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
  children: ReactNode;
  imgClass?: string;
  onChange?: (file: FileMap[]) => void;
}

function FileInput({
  mode = "multiple",
  children,
  imgClass,
  onChange,
}: FileInputProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(new Map<string, FileMap>());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const firstKeyMap = Array.from(files.keys()).at(0);

  const handleChange = () => {
    const values = Array.from(files.values());
    onChange?.(values);
  };

  // Add new files
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

  // Remove file
  const handleRemoveFile = (key: string) => {
    setFiles((prev) => {
      const updated = new Map(prev);
      updated.delete(key);
      return updated;
    });
  };

  // Reorder files
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

  useEffect(() => {
    handleChange();
  }, [files]);

  return (
    <>
      <button
        type="button"
        className="hover:cursor-pointer w-full"
        onClick={() => setOpen(true)}
      >
        {mode == "multiple" && <>{children}</>}
        {mode == "single" && !firstKeyMap && <>{children}</>}
      </button>
      {mode == "single" && firstKeyMap && (
        <div className={imgClass}>
          <div className="relative group aspect-square border rounded-lg overflow-hidden">
            <img
              src={files.get(firstKeyMap)?.url}
              alt=""
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              size="icon"
              className="hidden group-hover:flex absolute top-1 right-1 rounded-full bg-white/80 hover:bg-white size-6"
              variant="ghost"
              onClick={() => handleRemoveFile(firstKeyMap)}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      )}

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
            <div className="flex my-4 flex-wrap gap-2">
              {Array.from(files.entries()).map((entry) => (
                <SortableImage
                  key={entry[0]}
                  entry={entry}
                  onRemove={handleRemoveFile}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
