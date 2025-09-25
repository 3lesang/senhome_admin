import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import Editor from "@/components/editor";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	title: z.string().min(1),
	slug: z.string().min(1),
	content: z.string().optional(),
});

export type StorePageFormValuesType = z.infer<typeof formSchema>;

interface StorePageFormProps {
	defaultValues: StorePageFormValuesType;
	ref: React.Ref<UseFormReturn<StorePageFormValuesType>>;
}

export default function StorePageForm({
	defaultValues,
	ref,
}: StorePageFormProps) {
	const form = useForm<StorePageFormValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 space-y-4 gap-8">
				<div className="col-span-8">
					<Card className="border-0 shadow-none">
						<CardContent className="space-y-8">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tiêu đề trang</FormLabel>
										<FormControl>
											<div className="p-2">
												<Input placeholder="" type="" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nội dung</FormLabel>
										<FormControl>
											<div className="p-2">
												<Editor
													content={field.value}
													onChange={field.onChange}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				</div>
				<div className="col-span-4">
					<Card className="border-0 shadow-none">
						<CardContent>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Đường dẫn</FormLabel>
										<FormControl>
											<div className="p-2">
												<Input placeholder="" type="" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				</div>
			</form>
		</Form>
	);
}
