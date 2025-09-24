import { Link } from "@tanstack/react-router";
import { ListFilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table-pagination";
import TableTabs from "@/components/table-tabs";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProductList } from "@/stores/product";
import ProductTable from "./table";
import DeleteAction from "./toolbar/delete-action";

const tabs = [
	{ label: "Tất cả sản phẩm", q: "" },
	{ label: "Đang hoạt động", q: "deleted=null" },
	{ label: "Bản nháp", q: "deleted!=null" },
];

function ProductContent() {
	const { data, page, limit, setPage, setLimit, setQuery } = useProductList();

	const handleChange = ({ limit, page }: TablePaginationDataChange) => {
		setPage(page);
		setLimit(limit);
	};

	return (
		<Card className="border-0 shadow-none bg-sidebar">
			<CardHeader>
				<CardTitle>
					<TableTabs data={tabs} onChange={setQuery} />
				</CardTitle>
				<CardDescription>
					<Badge variant="secondary">{data.totalItems} sản phẩm</Badge>
				</CardDescription>
				<CardAction className="flex items-center gap-2">
					<DeleteAction />
					<Button variant="outline" size="icon">
						<SearchIcon />
					</Button>
					<Button variant="outline" size="icon">
						<ListFilterIcon />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<ProductTable data={data.items} />
			</CardContent>
			<CardFooter>
				<TablePagination
					page={page}
					limit={limit}
					onChange={handleChange}
					total={data.totalItems}
				/>
			</CardFooter>
		</Card>
	);
}

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
