import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="my-4 border-0 p-0 rounded-md shadow-none">
        <CardContent className="p-0">
          <ListPageTable data={data?.items} />
        </CardContent>
      </Card>
      <ListPagePagination />
    </div>
  );
}

export default ListPageBody;
