import { Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  onChange?: (files: File[]) => void;
}

function FileDropzone({ onChange }: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (accepted: File[]) => {
    onChange?.([...files, ...accepted]);
    setFiles((prev) => [...prev, ...accepted]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 5,
  });

  const text = isDragActive
    ? "Thả tệp vào đây..."
    : "Kéo & thả hoặc nhấp để chọn tệp";

  return (
    <div
      {...getRootProps()}
      className={`border border-dashed rounded-lg p-6 h-64 flex justify-center items-center text-center cursor-pointer transition ${
        isDragActive ? "bg-muted" : "hover:bg-muted/50"
      }`}
    >
      <div>
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-2 size-6 text-gray-600" />
        <span className="text-sm text-gray-600">{text}</span>
      </div>
    </div>
  );
}

export default FileDropzone;
