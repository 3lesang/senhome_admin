import type { UseFormReturn } from "react-hook-form";
import Editor from "@/components/editor";
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
import { Input } from "@/components/ui/input";
import type { CollectionFormValuesType } from ".";

interface CollectionInfoProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export default function CollectionInfo({ form }: CollectionInfoProps) {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Thông tin chung</CardTitle>
				<CardDescription>Tên, mô tả nhóm sản phẩm</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên</FormLabel>
							<FormControl>
								<Input placeholder="ví dụ, sản phẩm mới nhất,..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mô tả</FormLabel>
							<FormControl>
								<Editor content={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
