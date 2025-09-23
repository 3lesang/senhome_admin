"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Editor from "./editor";
import { LoadingButton } from "./ui/loading-button";

const formSchema = z.object({
	title: z.string().min(1),
	content: z.string().optional(),
});

export type PolicyFormValuesType = z.infer<typeof formSchema>;

interface PolicyFormProps {
	defaultValues: PolicyFormValuesType;
	onSubmit?: (values: PolicyFormValuesType) => void;
	isPending?: boolean;
	text: string;
}
export default function PolicyForm({
	defaultValues,
	onSubmit,
	isPending,
	text,
}: PolicyFormProps) {
	const form = useForm<PolicyFormValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	function handleSubmit(values: PolicyFormValuesType) {
		onSubmit?.(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên chính sách</FormLabel>
							<FormControl>
								<Input placeholder="" type="" {...field} />
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
								<Editor content={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<LoadingButton type="submit" loading={isPending}>
					{text}
				</LoadingButton>
			</form>
		</Form>
	);
}
