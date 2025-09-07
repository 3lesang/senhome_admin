import { PageListProvider } from "@/features/product/provider/list";
import ListPageBody from "./body";
import ListPageFooter from "./footer";
import ListPageHeader from "./header";

function ProductListPage() {
  return (
    <PageListProvider>
      <ListPageHeader />
      <ListPageBody />
      <ListPageFooter />
    </PageListProvider>
  );
}

export default ProductListPage;
