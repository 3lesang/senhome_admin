import { Link } from "@tanstack/react-router";
import { ChevronRightIcon, Package2Icon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CreatePageHeader() {
	return (
		<div className="flex items-center gap-1">
			<Link
				to="/products"
				className={cn(
					buttonVariants({ size: "icon", variant: "ghost" }),
					"size-6",
				)}
			>
				<Package2Icon />
			</Link>
			<ChevronRightIcon className="size-4 text-gray-600" />
			<h3 className="font-semibold">Thêm sản phẩm</h3>
		</div>
	);
}

export default CreatePageHeader;
