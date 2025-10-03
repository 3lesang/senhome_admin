import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PRODUCT_STATE } from "@/constants/product";
import type { ProductFormType } from "./types";

interface ProductStateProps {
	form: UseFormReturn<ProductFormType>;
}

export default function ProductState({ form }: ProductStateProps) {
	return (
		<Card className="shadow-none border-0">
			<CardContent>
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Trạng thái</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Chọn trạng thái" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(PRODUCT_STATE).map((item) => (
										<SelectItem value={item.value} key={item.value}>
											{item.text}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
