import { PageListProvider } from "@/features/product/provider/list";
import ListPageBody from "./body";
import DeleteDialog from "./delete-dialog";
import ListPageHeader from "./header";

function ProductListPage() {
  return (
    <PageListProvider>
      <ListPageHeader />
      <ListPageBody />
      <DeleteDialog />
    </PageListProvider>
  );
}

export default ProductListPage;
