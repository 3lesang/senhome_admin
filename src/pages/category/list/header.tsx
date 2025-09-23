import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { CategoryValuesType } from "@/components/category-form";
import CategoryForm from "@/components/category-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { createCategoryPocket } from "@/pocketbase/category/create";
import { useCategoryList } from "@/stores/category";
import ListPageTabs from "./toolbar/tabs";

export default function ListPageHeader() {
	const [open, setOpen] = useState(false);
	const { refetch } = useCategoryList();
	const { mutate } = useMutation({
		mutationFn: (values: CategoryValuesType) =>
			createCategoryPocket({ name: values.name }),
		onSuccess: () => {
			refetch();
			setOpen(false);
		},
	});

	const handleSubmit = (values: CategoryValuesType) => {
		mutate(values);
	};

	return (
		<div className="sticky top-0 z-50 bg-gray-50 pt-4">
			<div className="max-w-7xl mx-auto space-y-4">
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-2xl">Danh mục sản phẩm</h3>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button onClick={() => setOpen(true)}>Thêm mới</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Tạo danh mục</DialogTitle>
							</DialogHeader>
							<CategoryForm text="Tạo danh mục" onSubmit={handleSubmit} />
						</DialogContent>
					</Dialog>
				</div>
				<ListPageTabs />
			</div>
		</div>
	);
}
