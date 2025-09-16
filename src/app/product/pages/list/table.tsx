import type { ProductDataType } from "@/app/product/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import PageListTableRow from "./row";

interface ListPageTableProps {
	data?: ProductDataType[];
	categoryMap?: Record<string, { id: string; name: string }>;
}

export default function ListPageTable({
	data = [],
	categoryMap,
}: ListPageTableProps) {
	return (
		<Table>
			<TableHeader className="bg-gray-50">
				<TableRow>
					<TableHead>
						<Checkbox />
					</TableHead>
					<TableHead>Tên sản phẩm</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead>Danh mục</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item: ProductDataType) => (
					<PageListTableRow
						key={item?.id}
						data={item}
						categoryMap={categoryMap}
					/>
				))}
			</TableBody>
		</Table>
	);
}
