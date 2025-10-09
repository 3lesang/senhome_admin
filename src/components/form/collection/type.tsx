import type { UseFormReturn } from "react-hook-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CollectionFormValuesType } from ".";

interface CollectionTypeProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export default function CollectionType({ form }: CollectionTypeProps) {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Loại bộ sưu tập</CardTitle>
				<CardDescription>
					Bạn có thể chọn một trong hai cách bên dưới để thêm sản phẩm vào danh
					mục này.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<RadioGroup onValueChange={field.onChange} value={field.value}>
									<FormItem className="flex items-center space-x-2">
										<FormControl>
											<RadioGroupItem value="manual" />
										</FormControl>
										<FormLabel>Tự chọn sản phẩm</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-2">
										<FormControl>
											<RadioGroupItem value="smart" />
										</FormControl>
										<FormLabel>
											Sản phẩm tự động cập nhật dựa trên những điều kiện.
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
