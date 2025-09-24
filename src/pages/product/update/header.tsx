import { Link } from "@tanstack/react-router";
import {
	ChevronDownIcon,
	ChevronRightIcon,
	Package2Icon,
	Trash2Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCT_STATE } from "@/constants/product";
import { cn } from "@/lib/utils";
import type { ProductDataType } from "@/types/product";

interface UpdatePageHeaderProps {
	data: ProductDataType;
}

function UpdatePageHeader({ data }: UpdatePageHeaderProps) {
	const state = data.deleted ? "draft" : "publish";

	return (
		<div className="">
			<div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
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
					<h3 className="font-semibold">{data?.name}</h3>
					<Badge variant={state === "draft" ? "secondary" : "default"}>
						{PRODUCT_STATE[state].text}
					</Badge>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button type="button" variant="outline">
								Hành động
								<ChevronDownIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Hành động</DropdownMenuLabel>
							<DropdownMenuItem>Xem sản phẩm</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Trash2Icon />
								Xóa sản phẩm
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}

export default UpdatePageHeader;
