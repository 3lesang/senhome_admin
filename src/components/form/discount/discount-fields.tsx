import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { withFieldGroup } from "./hooks/form";

export const DiscountFields = withFieldGroup({
	defaultValues: {
		has_type: true,
		type: "",
		code: "",
		title: "",
		description: "",
	},
	render: ({ group }) => {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Số tiền giảm giá của sản phẩm</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<group.Subscribe selector={(state) => state.values.has_type}>
						{(state) =>
							state && (
								<group.AppField name="type">
									{(field) => (
										<Field>
											<FieldLabel>Loại giảm giá</FieldLabel>
											<DiscountType
												value={field.state.value}
												onChange={field.handleChange}
											/>
										</Field>
									)}
								</group.AppField>
							)
						}
					</group.Subscribe>
					<group.Subscribe selector={(state) => state.values.type}>
						{(type) =>
							type === "code" ? (
								<group.AppField name="code">
									{(field) => (
										<Field>
											<FieldLabel>Mã giảm giá</FieldLabel>
											<Input
												value={field.state.value}
												onChange={(e) =>
													field.handleChange(e.currentTarget.value)
												}
											/>
											<FieldDescription>
												Khách hàng phải nhập mã này khi thanh toán.
											</FieldDescription>
										</Field>
									)}
								</group.AppField>
							) : (
								<group.AppField name="title">
									{(field) => (
										<Field>
											<FieldLabel>Tiêu đề</FieldLabel>
											<Input
												value={field.state.value}
												onChange={(e) =>
													field.handleChange(e.currentTarget.value)
												}
											/>
											<FieldDescription>
												Khách hàng sẽ thấy thông tin này trong giỏ hàng và khi
												thanh toán.
											</FieldDescription>
										</Field>
									)}
								</group.AppField>
							)
						}
					</group.Subscribe>
					<group.AppField name="description">
						{(field) => (
							<Field className="">
								<FieldLabel>Mô tả</FieldLabel>
								<Input
									value={field.state.value}
									onChange={(e) => field.handleChange(e.currentTarget.value)}
								/>
							</Field>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});

type DiscountTypeProps = {
	value: string;
	onChange: (value: string) => void;
};

function DiscountType({ value, onChange }: DiscountTypeProps) {
	return (
		<ButtonGroup className="hidden sm:flex">
			<ButtonGroup>
				<Button
					type="button"
					variant={value === "code" ? "secondary" : "outline"}
					onClick={() => {
						onChange?.("code");
					}}
				>
					Mã giảm giá
				</Button>
				<Button
					type="button"
					variant={value === "automatic" ? "secondary" : "outline"}
					onClick={() => {
						onChange?.("automatic");
					}}
				>
					Giảm giá tự động
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	);
}
