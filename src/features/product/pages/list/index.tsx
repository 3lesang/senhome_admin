import { PageListProvider } from "@/features/product/provider/list";
import ListPageBody from "./body";
import ListPageHeader from "./header";

function ProductListPage() {
  return (
    <PageListProvider>
      <ListPageHeader />
      <ListPageBody />
    </PageListProvider>
  );
}

export default ProductListPage;
