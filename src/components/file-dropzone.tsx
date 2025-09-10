import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface RenderProps {
  isDragActive: boolean;
}
interface FileDropzoneProps {
  onChange?: (files: File[]) => void;
  render: (data: RenderProps) => React.ReactNode;
}

function FileDropzone({ onChange, render }: FileDropzoneProps) {
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

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {render({ isDragActive })}
    </div>
  );
}

export default FileDropzone;
