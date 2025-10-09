import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function CollectionSmartProductForm() {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Các điều kiện</CardTitle>
				<CardDescription>
					Các sản phẩm sẽ được tự động đưa vào danh mục này dựa vào các điều
					kiện bên dưới.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-3 gap-2">
				<Select defaultValue="tag">
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="tag">Nhãn</SelectItem>
					</SelectContent>
				</Select>
				<Select defaultValue="equal">
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="equal">bằng với</SelectItem>
					</SelectContent>
				</Select>
				<Input className="w-full" />
			</CardContent>
		</Card>
	);
}
