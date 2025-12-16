import axiosClient from "@/axios";
import { SpotInput } from "@/components/spot-input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { HOTSPOT_QUERY_KEY } from "@/constants";
import { cn, encodeToAvif } from "@/lib/utils";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Trash2Icon, UploadIcon } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
	file: z.instanceof(File).optional().nullable(),
	file_url: z.string(),
	spots: z.array(
		z.object({
			id: z.number(),
			x: z.number(),
			y: z.number(),
			product: z
				.object({
					id: z.number(),
					name: z.string(),
					file: z.string().optional(),
				})
				.optional(),
		}),
	),
});

type FormValues = z.infer<typeof schema>;

export function HotSpotCreatePage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient()
	const savePageMutation = useMutation({
		mutationFn: async (value: FormValues) => {
			const fileKey = `hotspot/${value.file?.name}`;
			const spotParams = {
				file: fileKey,
				spots: value.spots.map((spot) => ({
					x: spot.x,
					y: spot.y,
					product_id: spot.product?.id,
				})),
			};
			if (value.file?.name) {
				await s3Client.send(
					new PutObjectCommand({
						Bucket: "r2-bucket",
						Key: fileKey,
						Body: value.file,
						ContentType: value.file.type
					}),
				);
			}
			const res = await axiosClient.post("/hotspots", spotParams);
			return res.data
		},
		onSuccess: () => {
			toast("Bộ sưu tập đã được tạo thành công!");
			queryClient.invalidateQueries({ queryKey: [HOTSPOT_QUERY_KEY, 1, 10] })
			navigate({ to: "/products/collections/hotspots" });
		},
	});

	const defaultValues: FormValues = {
		file_url: "",
		spots: [],
	};

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => savePageMutation.mutateAsync(value),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
				<CardHeader>
					<CardTitle>Thêm bộ sưu tập</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-12 gap-4">
					<div className="col-span-8">
						<Card className="border-0 shadow-none">
							<CardHeader>
								<CardTitle>Hình ảnh bộ sưu tập</CardTitle>
							</CardHeader>
							<CardContent>
								<form.Field name="file_url">
									{(field) =>
										field.state.value ? (
											<form.Field name="spots">
												{(spotField) => (
													<div className="relative">
														<SpotInput
															onChange={(value) =>
																spotField.handleChange(value)
															}
														>
															<div className="h-[600px] bg-neutral-50">
																<img
																	src={field.state.value}
																	alt=""
																	className="object-contain h-full w-full"
																/>
															</div>
														</SpotInput>
														<Button
															type="button"
															size="icon"
															variant="outline"
															className="absolute top-2 right-2 rounded-full"
															onClick={() => {
																form.setFieldValue("file", null);
																form.setFieldValue("file_url", "");
																form.setFieldValue("spots", []);
															}}
														>
															<Trash2Icon />
														</Button>
													</div>
												)}
											</form.Field>
										) : (
											<form.Field name="file">
												{(fileField) => (
													<Empty>
														<EmptyHeader>
															<EmptyMedia variant="icon">
																<UploadIcon />
															</EmptyMedia>
															<EmptyTitle>Chưa có hình ảnh</EmptyTitle>
															<EmptyDescription>
																Hãy tải hình ảnh lên
															</EmptyDescription>
														</EmptyHeader>
														<EmptyContent>
															<label className={cn(buttonVariants())}>
																<input
																	className="hidden"
																	type="file"
																	accept="image/*"
																	onChange={async (e) => {
																		const [file] = e.currentTarget.files ?? [];
																		const toastID = toast.loading(
																			"Đang tải hình lên...",
																			{
																				duration: Infinity,
																				position: "top-center",
																			},
																		);
																		const avifFile = await encodeToAvif(file);
																		toast.dismiss(toastID);
																		fileField.handleChange(avifFile);
																		const fileUrl =
																			URL.createObjectURL(avifFile);
																		field.setValue(fileUrl);
																	}}
																/>
																Tải lên
															</label>
														</EmptyContent>
													</Empty>
												)}
											</form.Field>
										)
									}
								</form.Field>
							</CardContent>
						</Card>
					</div>
					<div className="col-span-4"></div>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						disabled={savePageMutation.isPending}
						className="ml-auto"
					>
						{savePageMutation.isPending && <Spinner />}
						Lưu
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
