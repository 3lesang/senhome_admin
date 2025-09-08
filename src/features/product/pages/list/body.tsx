import { Badge } from "@/components/ui/badge";
import { usePageList } from "@/features/product/provider/list";
import PageListEmpty from "./empty";
import ListPagePagination from "./pagination";
import ListPageTable from "./table";
import DeleteAction from "./toolbar/delete-action";
import PageListSearchInput from "./toolbar/page-search";

function ListPageBody() {
  const { data, isLoading } = usePageList();

  if (isLoading) return null;
  if (Number(data?.totalItems) == 0 && !isLoading) return <PageListEmpty />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between py-4">
        <PageListSearchInput />
        <DeleteAction />
      </div>
      <div>
        <Badge variant="secondary">{data?.totalItems} sản phẩm</Badge>
      </div>
      <div className="my-4">
        <ListPageTable data={data?.items} />
      </div>
      <ListPagePagination />
    </div>
  );
}

export default ListPageBody;
