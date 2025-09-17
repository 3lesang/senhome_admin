"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
	name: z.string().min(1),
});

export type CategoryValuesType = z.infer<typeof formSchema>;

interface CategoryFormProps {
	defaultValues?: CategoryValuesType;
	onSubmit?: (values: CategoryValuesType) => void;
	text?: string;
}

export default function CategoryForm({
	onSubmit,
	defaultValues,
	text,
}: CategoryFormProps) {
	const form = useForm<CategoryValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	function handleSubmit(values: CategoryValuesType) {
		onSubmit?.(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên danh mục</FormLabel>
							<FormControl>
								<Input placeholder="Tên danh mục" type="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="text-right">
					<Button type="submit">{text}</Button>
				</div>
			</form>
		</Form>
	);
}
