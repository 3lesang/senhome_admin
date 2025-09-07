import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { usePageList } from "@/features/product/provider/list";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import ListPageToolbar from "./toolbar";

function ListPageHeader() {
  const { data } = usePageList();
  return (
    <div className="sticky top-0 z-50 bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">Quản lý sản phẩm</h3>
          <div>
            <Link to="/product/create" className={cn(buttonVariants())}>
              Thêm mới
            </Link>
          </div>
        </div>
        <ListPageToolbar />
        <div>
          {Number(data?.totalItems) > 0 && (
            <Badge variant="secondary">{data?.totalItems} sản phẩm</Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListPageHeader;
