import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ProductDataType } from "@/types/product";
import PageListTableRow from "./row";

interface ProductTableProps {
	data?: ProductDataType[];
	categoryMap?: Record<string, { id: string; name: string }>;
}

export default function ProductTable(props: ProductTableProps) {
	const { data = [], categoryMap } = props;
	return (
		<Table className="bg-white rounded-md">
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
