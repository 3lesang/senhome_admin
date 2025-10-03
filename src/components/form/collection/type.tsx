import { useId } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CollectionType() {
	const optionOne = useId();
	const optionTwo = useId();
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Loại</CardTitle>
				<CardDescription>
					Bạn có thể chọn một trong hai cách bên dưới để thêm sản phẩm vào danh
					mục này.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<RadioGroup defaultValue="option-one">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="option-one" id={optionOne} />
						<Label htmlFor={optionOne}>Tự chọn sản phẩm</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="option-two" id={optionTwo} />
						<Label htmlFor={optionTwo}>
							Sản phẩm tự động cập nhật dựa trên những điều kiện.
						</Label>
					</div>
				</RadioGroup>
			</CardContent>
		</Card>
	);
}
