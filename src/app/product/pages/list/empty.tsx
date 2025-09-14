import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

function PageListEmpty() {
  return (
    <div>
      <div className="flex justify-center items-center h-96 max-w-7xl mx-auto">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 text-center">Chưa có sản phẩm</p>
          <Link to="/product/create" className={cn(buttonVariants())}>
            Thêm sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageListEmpty;
