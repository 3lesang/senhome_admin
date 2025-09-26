import { CloudUploadIcon } from "lucide-react";

interface DropzoneProps {
	isDragActive: boolean;
}
function Dropzone({ isDragActive }: DropzoneProps) {
	const text = isDragActive
		? "Thả tệp vào đây..."
		: "Kéo & thả hoặc nhấp để chọn tệp";

	return (
		<div className="flex justify-center items-center h-32 border border-dashed rounded-md text-gray-500 bg-gray-50 hover:cursor-pointer hover:bg-gray-100">
			<div>
				<CloudUploadIcon className="mx-auto" />
				<p className="text-sm">{text}</p>
			</div>
		</div>
	);
}

export default Dropzone;
