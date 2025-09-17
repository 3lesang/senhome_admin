import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProductList } from "@/stores/product";
import PageListEmpty from "./empty";
import ListPagePagination from "./pagination";
import ListPageTable from "./table";
import DeleteAction from "./toolbar/delete-action";
import PageListSearchInput from "./toolbar/page-search";

export default function ListPageBody() {
	const { data, isLoading } = useProductList();

	const { products, categoryMap } = data ?? {};
	const { totalItems, items } = products ?? {};

	if (isLoading) return null;
	if (Number(totalItems) === 0 && !isLoading) return <PageListEmpty />;

	return (
		<div className="max-w-7xl mx-auto">
			<div className="flex items-center justify-between py-4">
				<PageListSearchInput />
				<DeleteAction />
			</div>
			<div>
				<Badge variant="secondary">{totalItems} sản phẩm</Badge>
			</div>
			<Card className="my-4 border-0 p-0 rounded-md shadow-none">
				<CardContent className="p-0">
					<ListPageTable data={items} categoryMap={categoryMap} />
				</CardContent>
			</Card>
			<ListPagePagination />
		</div>
	);
}
