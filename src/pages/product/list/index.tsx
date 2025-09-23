import { Link } from "@tanstack/react-router";
import { useId } from "react";
import { DynamicPagination } from "@/components/dynamic-pagination";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useProductList } from "@/stores/product";
import PageListEmpty from "./empty";
import ProductTable from "./table";
import DeleteAction from "./toolbar/delete-action";
import PageListSearchInput from "./toolbar/page-search";
import ListPageTabs from "./toolbar/tabs";

function ProductContent() {
	const { data, isLoading, page, limit, setPage, setLimit } = useProductList();
	const id = useId();

	const { products, categoryMap } = data ?? {};
	const { totalItems, items } = products ?? {};
	if (isLoading) return null;
	if (Number(totalItems) === 0 && !isLoading) return <PageListEmpty />;
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<PageListSearchInput />
				<DeleteAction />
			</div>
			<Badge variant="secondary">{totalItems} sản phẩm</Badge>
			<ProductTable data={items} categoryMap={categoryMap} />
			<div className="flex justify-between">
				<div className="flex w-full max-w-sm items-center gap-4">
					<Label htmlFor={id} className="whitespace-nowrap">
						Số lượng
					</Label>
					<Select
						value={limit.toString()}
						onValueChange={(val) => {
							setLimit(Number(val));
							setPage(1);
						}}
					>
						<SelectTrigger id={id} className="bg-white w-[120px]">
							<SelectValue placeholder="Chọn số lượng" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<DynamicPagination
					page={page}
					totalItems={data?.products.totalItems ?? 0}
					perPage={limit}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
}

export default function ProductListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý sản phẩm</CardTitle>
				<CardDescription>Danh sách sản phẩm</CardDescription>
				<CardAction>
					<Link to="/product/create" className={cn(buttonVariants())}>
						Thêm mới
					</Link>
				</CardAction>
				<ListPageTabs />
			</CardHeader>
			<CardContent>
				<ProductContent />
			</CardContent>
		</Card>
	);
}
