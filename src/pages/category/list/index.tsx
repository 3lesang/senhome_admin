import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CategoryContent from "./content";

export default function CategoryListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh mục</CardTitle>
				<CardDescription>Danh sách danh mục sản phẩm</CardDescription>
				<CardAction>
					<Button>
						<PlusIcon />
						Tạo danh mục
					</Button>
				</CardAction>
			</CardHeader>
			<CategoryContent />
		</Card>
	);
}
