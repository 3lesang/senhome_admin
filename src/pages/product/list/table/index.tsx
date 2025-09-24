import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ProductDataType } from "@/types/product";
import ProductRow from "./row";

interface ProductTableProps {
	data?: ProductDataType[];
}

export default function ProductTable(props: ProductTableProps) {
	const { data = [] } = props;
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-gray-50">
				<TableRow>
					<TableHead>
						<Checkbox />
					</TableHead>
					<TableHead>Tên sản phẩm</TableHead>
					<TableHead>Trạng thái</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item: ProductDataType) => (
					<ProductRow key={item?.id} data={item} />
				))}
			</TableBody>
		</Table>
	);
}
