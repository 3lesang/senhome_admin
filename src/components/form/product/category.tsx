import { useSuspenseQuery } from "@tanstack/react-query";
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
import { getFullListCategoryQueryOptions } from "@/handlers/category/query/list";
import type { ProductFormType } from "@/types/product";

interface ProductCategoryProps {
	form: UseFormReturn<ProductFormType>;
}

export default function ProductCategory({ form }: ProductCategoryProps) {
	const { data: categories } = useSuspenseQuery(
		getFullListCategoryQueryOptions(),
	);
	return (
		<Card className="shadow-none border-0">
			<CardContent>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Danh mục</FormLabel>
							<Select defaultValue={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories?.map((item) => (
										<SelectItem value={item?.id} key={item.id}>
											{item?.name}
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
