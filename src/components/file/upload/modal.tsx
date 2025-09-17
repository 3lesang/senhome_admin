import FileDropzone from "@/components/file-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import Dropzone from "./dropzone";
import UploadPreview from "./preview";

interface UploadModalProps {
  onConfirm?: (files: File[]) => void;
}

function UploadModal({ onConfirm }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleUpload = () => {
    onConfirm?.(files);
    setFiles([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          Tải lên
          <UploadCloudIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-5xl">
        <DialogHeader>
          <DialogTitle>Tải tệp lên</DialogTitle>
        </DialogHeader>
        <FileDropzone
          onChange={(files) => setFiles(files)}
          render={({ isDragActive }) => (
            <Dropzone isDragActive={isDragActive} />
          )}
        />
        <UploadPreview files={files} onRemove={removeFile} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Hủy
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleUpload}>
              Tải lên
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
