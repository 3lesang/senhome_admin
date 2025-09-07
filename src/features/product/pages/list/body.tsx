import { usePageList } from "@/features/product/provider/list";
import ListPageTable from "./table";

function ListPageBody() {
  const { data, isLoading } = usePageList();

  if (isLoading) return;

  return (
    <div className="max-w-7xl mx-auto">
      <ListPageTable data={data?.items ?? []} />
    </div>
  );
}

export default ListPageBody;
