import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductContent from "./content";

export default function ProductListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý sản phẩm</CardTitle>
				<CardDescription>Danh sách sản phẩm</CardDescription>
				<CardAction className="flex gap-2 items-center">
					<Link to="/products/create" className={cn(buttonVariants())}>
						<PlusIcon />
						Tạo sản phẩm
					</Link>
				</CardAction>
			</CardHeader>
			<ProductContent />
		</Card>
	);
}
