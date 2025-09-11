import { usePageList } from "@/features/file/provider/list";
import MediaFile from "./file";

function PageListGrid() {
  const { data } = usePageList();

  return (
    <div className="grid grid-cols-10 gap-1">
      {data?.items?.map((item) => (
        <MediaFile key={item.id} data={item} />
      ))}
    </div>
  );
}

export default PageListGrid;
