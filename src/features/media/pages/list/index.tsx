import { PageListProvider } from "@/features/media/provider/list";
import ListPageBody from "./body";
import PageListHeader from "./header";

function MediaListPage() {
  return (
    <PageListProvider>
      <PageListHeader />
      <ListPageBody />
    </PageListProvider>
  );
}

export default MediaListPage;
