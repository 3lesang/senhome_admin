import { useState, type ReactNode } from "react";

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
} from "@dnd-kit/sortable";

import FileModal from "@/features/file/components/select/modal";
import type { FileType } from "@/features/file/types";
import SortableItem from "./sortable-item";

interface RenderDataProps {
  files: FileType[];
  handleRemove?: (id: string) => void;
  handleOpen?: () => void;
}

interface FileInputProps {
  value?: FileType[];
  mode?: "single" | "multiple";
  onChange?: (file: FileType[]) => void;
  render?: (data: RenderDataProps) => ReactNode;
}

function FileInput(props: FileInputProps) {
  const { value = [], mode = "multiple", onChange, render } = props;
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>(value);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleChange = (newFiles: FileType[]) => {
    setFiles(newFiles);
    onChange?.(newFiles);
    setOpen(false);
  };

  const handleRemoveFile = (id: string) => {
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
    onChange?.(newFiles);
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
                <SortableItem
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
