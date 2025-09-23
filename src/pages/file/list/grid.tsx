import { useFileList } from "@/stores/file";
import FileItem from "./file-item";

export default function PageListGrid() {
	const { data } = useFileList();

	return (
		<div className="grid grid-cols-10 gap-1">
			{data?.items?.map((item) => (
				<FileItem key={item.id} data={item} />
			))}
		</div>
	);
}
