import { useFileList } from "@/stores/file";
import MediaFile from "./file";

export default function PageListGrid() {
	const { data } = useFileList();

	return (
		<div className="grid grid-cols-10 gap-1">
			{data?.items?.map((item) => (
				<MediaFile key={item.id} data={item} />
			))}
		</div>
	);
}
