import { useId } from "react";
import { DynamicPagination } from "@/components/dynamic-pagination";
import { Badge } from "@/components/ui/badge";
import {
	Card,
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
import { useOrderList } from "@/stores/order";
import PageListEmpty from "./empty";
import OrderTable from "./table";
import DeleteAction from "./toolbar/delete-action";
import PageListSearchInput from "./toolbar/page-search";
import ListPageTabs from "./toolbar/tabs";

function OrderContent() {
	const { data, isLoading, page, limit, setPage, setLimit } = useOrderList();
	const id = useId();

	if (isLoading) return null;
	if (Number(data?.totalItems) === 0 && !isLoading) return <PageListEmpty />;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<PageListSearchInput />
				<DeleteAction />
			</div>
			<Badge variant="secondary">{data?.totalItems} đơn hàng</Badge>
			<OrderTable data={data?.items} />
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
				<div>
					<DynamicPagination
						page={page}
						totalItems={data?.totalItems ?? 0}
						perPage={limit}
						onPageChange={setPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default function OrderListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý đơn hàng</CardTitle>
				<CardDescription>Danh sách đơn hàng</CardDescription>
				<ListPageTabs />
			</CardHeader>
			<CardContent>
				<OrderContent />
			</CardContent>
		</Card>
	);
}
