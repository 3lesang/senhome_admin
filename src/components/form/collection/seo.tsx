import { EditIcon } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CollectionFormValuesType } from ".";

interface CollectionSEOProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export default function CollectionSEO({ form }: CollectionSEOProps) {
	const [open, setOpen] = useState(false);

	function handleToogle() {
		setOpen((o) => !o);
	}

	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Tối ưu SEO</CardTitle>
				<CardDescription>
					Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy danh mục này
					trên công cụ tìm kiếm như Google.
				</CardDescription>
				<CardAction>
					<Button
						type="button"
						size="icon"
						variant="ghost"
						onClick={handleToogle}
					>
						<EditIcon />
					</Button>
				</CardAction>
			</CardHeader>
			{!open && (
				<CardContent>
					<p>{form.getValues("seo.title")}</p>
					<small>{form.getValues("seo.description")}</small>
					<small>{form.getValues("slug")}</small>
				</CardContent>
			)}
			{open && (
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="seo.title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tiêu đề trang</FormLabel>
								<FormControl>
									<Input placeholder="Tiêu đề trang" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="seo.description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mô tả trang</FormLabel>
								<FormControl>
									<AutosizeTextarea
										placeholder="Mô tả trang"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Đường dẫn</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>collections/</FormDescription>
							</FormItem>
						)}
					/>
				</CardContent>
			)}
		</Card>
	);
}
