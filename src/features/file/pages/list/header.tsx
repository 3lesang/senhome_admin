import UploadModal from "@/features/file/components/upload/modal";
import { createFileHandler } from "@/features/file/handler/mutation/create";
import { usePageList } from "@/features/file/provider/list";
import { useMutation } from "@tanstack/react-query";
import ListPageToolbar from "./toolbar";

function PageListHeader() {
  const { refetch } = usePageList();
  const { mutate } = useMutation({
    mutationFn: createFileHandler,
    onSuccess: () => {
      refetch?.();
    },
  });

  const handleUpload = (files: File[]) => {
    mutate(files);
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">Quản lý lưu trữ</h3>
          <div>
            <UploadModal onConfirm={handleUpload} />
          </div>
        </div>
        <ListPageToolbar />
      </div>
    </div>
  );
}

export default PageListHeader;
