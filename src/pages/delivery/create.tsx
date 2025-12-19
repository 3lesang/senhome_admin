import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";
import axiosClient from "@/axios";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
	name: z.string(),
	minWeight: z.number(),
	maxWeight: z.number(),
	feeAmount: z.number(),
	minOrderValue: z.number(),
	freeShipping: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function DeliveryCreatePage() {
	const navigate = useNavigate();
	const saveMenuMutation = useMutation({
		mutationFn: async (value: FormValues) => {
			return axiosClient.post<{ id: number }>("/shipping-fees", {
				name: value.name,
				min_weight: value.minWeight,
				max_weight: value.maxWeight,
				fee_amount: value.feeAmount,
				min_order_value: value.minOrderValue,
				free_shipping: value.freeShipping,
			});
		},
		onSuccess: () => {
			toast.success("Tạo phí vận chuyển thành công");
			navigate({ to: "/deliveries" });
		},
	});

	const defaultValues: FormValues = {
		name: "",
		minWeight: 0,
		maxWeight: 0,
		feeAmount: 0,
		minOrderValue: 0,
		freeShipping: false,
	};

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => saveMenuMutation.mutateAsync(value),
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
					<CardTitle>Thêm phí vận chuyển</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-12 gap-4">
					<div className="col-span-8 space-y-4">
						<Card className="shadow-none border-0">
							<CardContent className="grid grid-cols-2 gap-4">
								<form.Field name="name">
									{(field) => (
										<Field className="col-span-2">
											<FieldLabel>Tên</FieldLabel>
											<Input
												type="text"
												value={field.state.value}
												onChange={(e) =>
													field.handleChange(e.currentTarget.value)
												}
											/>
										</Field>
									)}
								</form.Field>
								<form.Field name="minWeight">
									{(field) => (
										<Field>
											<FieldLabel>Cân nặng thấp nhất</FieldLabel>
											<InputGroup>
												<InputGroupInput
													type="number"
													value={field.state.value}
													onChange={(e) =>
														field.handleChange(Number(e.currentTarget.value))
													}
												/>
												<InputGroupAddon align="inline-end">
													<InputGroupText>gr</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
										</Field>
									)}
								</form.Field>
								<form.Field name="maxWeight">
									{(field) => (
										<Field>
											<FieldLabel>Cân nặng cao nhất</FieldLabel>
											<InputGroup>
												<InputGroupInput
													type="number"
													value={field.state.value}
													onChange={(e) =>
														field.handleChange(Number(e.currentTarget.value))
													}
												/>
												<InputGroupAddon align="inline-end">
													<InputGroupText>gr</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
										</Field>
									)}
								</form.Field>
							</CardContent>
						</Card>
						<Card className="shadow-none border-0">
							<CardContent className="grid grid-cols-1 gap-4">
								<form.Field name="feeAmount">
									{(field) => (
										<Field>
											<FieldLabel>Phí vận chuyển</FieldLabel>
											<NumericFormat
												value={field.state.value}
												thousandSeparator
												customInput={Input}
												onValueChange={(v) =>
													v.floatValue && field.handleChange(v.floatValue)
												}
											/>
										</Field>
									)}
								</form.Field>
								<form.Field name="minOrderValue">
									{(field) => (
										<Field>
											<FieldLabel>Giá trị đơn hàng tối thiểu</FieldLabel>
											<NumericFormat
												value={field.state.value}
												thousandSeparator
												customInput={Input}
												onValueChange={(v) =>
													v.floatValue && field.handleChange(v.floatValue)
												}
											/>
										</Field>
									)}
								</form.Field>
							</CardContent>
						</Card>
					</div>
					<div className="col-span-4">
						<Card className="border-0 shadow-none">
							<CardContent>
								<form.Field name="freeShipping">
									{(field) => (
										<Field>
											<FieldLabel>Miễn phí vẫn chuyển</FieldLabel>
											<div>
												<Switch
													defaultChecked={field.state.value}
													onCheckedChange={field.handleChange}
												/>
											</div>
										</Field>
									)}
								</form.Field>
							</CardContent>
						</Card>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						disabled={saveMenuMutation.isPending}
						className="ml-auto"
					>
						{saveMenuMutation.isPending && <Spinner />}
						Lưu
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
