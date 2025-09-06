import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

function ProductListPage() {
  return (
    <div className="w-full py-8 px-32 mx-auto space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/product">Sản phẩm</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Sản phẩm</h3>
        <div>
          <Link to="/product/create" className={cn(buttonVariants())}>
            Thêm 1 sản phẩm mới
            <PlusIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
