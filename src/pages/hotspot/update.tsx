import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { SpotInput } from "@/components/spot-input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { convertToFileUrl } from "@/lib/utils";
import { getHotspotQueryOptions } from "@/queries/hotspot";
import axiosClient from "@/axios";

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

export function HotSpotUpdatePage() {
	const navigate = useNavigate();

	const { id } = useParams({
		from: "/(app)/products/collections/hotspots/$id",
	});
	const getHotspotQuery = useSuspenseQuery(getHotspotQueryOptions(id));

	const savePageMutation = useMutation({
		mutationFn: async (value: FormValues) => {
			const spotParams = {
				spots: value.spots.map((spot) => ({
					id: spot.id,
					x: spot.x,
					y: spot.y,
					product_id: spot.product?.id,
				})),
			};
			return axiosClient.put(`/hotspots/${id}`, spotParams);
		},
		onSuccess: () => {
			toast("Bộ sưu tập đã được tạo thành công!");
			navigate({ to: "/products/collections/hotspots" });
		},
	});

	const defaultValues: FormValues = {
		file_url: convertToFileUrl(getHotspotQuery.data.data.file),
		spots: getHotspotQuery.data.data.spots,
	};

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => savePageMutation.mutateAsync(value),
		onSubmitInvalid: ({ formApi }) => {
			console.log(formApi.getAllErrors());
		},
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
										field.state.value && (
											<form.Field name="spots">
												{(spotField) => (
													<SpotInput
														value={spotField.state.value}
														onChange={(value) => spotField.handleChange(value)}
													>
														<div className="h-[600px] bg-neutral-50">
															<img
																src={field.state.value}
																alt=""
																className="object-contain h-full"
															/>
														</div>
													</SpotInput>
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
