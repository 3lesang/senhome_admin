import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";
import { createReviewHandler } from "@/api/review/create";
import { getFullListUsersQueryOptions } from "@/api/user/list";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
	rating: z.number().max(5).min(1),
	content: z.string(),
	user: z.string().min(1),
	product: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function CreateReviewPage() {
	const navigate = useNavigate();
	const { id } = useParams({ from: "/(app)/product/$id/review/create" });
	const { data: users } = useQuery(getFullListUsersQueryOptions());

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			product: id,
			rating: 5,
			content: "",
			user: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: createReviewHandler,
		onSuccess: () => {
			navigate({ to: "/product/$id/review", params: { id } });
		},
	});

	function handleSubmit(values: FormValues) {
		mutate(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="border-0 shadow-none bg-transparent max-w-6xl mx-auto">
					<CardHeader>
						<CardTitle>Thêm đánh giá</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-12 gap-4">
						<div className="col-span-8">
							<Card className="border-0 shadow-none">
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="rating"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Đánh giá</FormLabel>
												<FormControl>
													<NumericFormat
														min={1}
														max={5}
														value={field.value}
														customInput={Input}
														onValueChange={(v) =>
															field.onChange(Number(v.value))
														}
													/>
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
													<Textarea className="resize-none" {...field} />
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
								<CardHeader>
									<CardTitle>Người dùng</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="user"
										render={({ field }) => (
											<FormItem>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="w-full">
														<FormControl>
															<SelectValue placeholder="Người dùng" />
														</FormControl>
													</SelectTrigger>
													<SelectContent>
														{users?.map((item) => (
															<SelectItem key={item.id} value={item.id}>
																{item.name}
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
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="ml-auto" disabled={isPending}>
							{isPending && <Spinner />}
							Lưu
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
