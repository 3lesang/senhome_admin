import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getOneStorePageQueryOptions } from "@/api/page/one";
import { updateStorePageHandler } from "@/api/page/update";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
	id: z.string(),
	title: z.string().min(1),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	slug: z.string().min(1),
});

export type FormValues = z.infer<typeof schema>;

export function StorePageUpdatePage() {
	const { id } = useParams({ from: "/(app)/store/page/$id" });
	const { data, refetch } = useSuspenseQuery(getOneStorePageQueryOptions(id));

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			id,
			title: data.title,
			slug: data.slug,
			content: data.content,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateStorePageHandler,
		onSuccess: () => {
			toast.success("Cập nhật trang thành công");
			refetch();
		},
	});

	function handleSubmit(values: FormValues) {
		mutate(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
					<CardHeader>
						<CardTitle>{data.title}</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-12 gap-4">
						<div className="col-span-8">
							<Card className="border-0 shadow-none">
								<CardContent className="space-y-4">
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
										render={() => (
											<FormItem>
												<FormLabel>Nội dung</FormLabel>
												<FormControl>
													<div className="p-2">
														{/*<TextEditor {...field} />*/}
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
					</CardContent>
					<CardFooter>
						<Button type="submit" disabled={isPending} className="ml-auto">
							{isPending && <Spinner />}
							Lưu
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
