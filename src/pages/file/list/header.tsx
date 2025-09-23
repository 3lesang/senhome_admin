import { useMutation } from "@tanstack/react-query";
import UploadModal from "@/components/file-upload/modal";
import { createFileHandler } from "@/handlers/file/mutation/create";
import { useFileList } from "@/stores/file";
import ListPageToolbar from "./toolbar";

export default function PageListHeader() {
	const { refetch } = useFileList();
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
