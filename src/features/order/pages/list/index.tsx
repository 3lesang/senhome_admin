import { PageListProvider } from "@/features/order/provider/list";
import ListPageBody from "./body";
import ListPageHeader from "./header";

function OrderListPage() {
  return (
    <PageListProvider>
      <ListPageHeader />
      <ListPageBody />
    </PageListProvider>
  );
}

export default OrderListPage;
