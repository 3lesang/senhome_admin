import { useMutation } from "@tanstack/react-query";
import UploadModal from "@/components/file-upload/modal";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileHandler } from "@/handlers/file/mutation/create";
import FileListContent from "./content";

export default function FileListPage() {
	const { mutate } = useMutation({
		mutationFn: createFileHandler,
		onSuccess: () => {},
	});

	const handleUpload = (files: File[]) => {
		mutate(files);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh sách files</CardTitle>
				<CardDescription>
					Những hình ảnh tải lên ở đây có thể được thêm cho sản phẩm, nhóm sản
					phẩm, trang và các bài blog.
				</CardDescription>
				<CardAction>
					<UploadModal onConfirm={handleUpload} />
				</CardAction>
			</CardHeader>
			<FileListContent />
		</Card>
	);
}
