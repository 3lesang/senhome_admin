import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { withFieldGroup } from "./hooks/form";

export const DeliveryFields = withFieldGroup({
	defaultValues: {
		weight: 0,
		long: 0,
		wide: 0,
		high: 0,
	},
	render: ({ group }) => {
		return (
			<Card className="shadow-none border-0">
				<CardHeader>
					<CardTitle>Vận chuyển</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-3 gap-4">
					<group.AppField name="weight">
						{(field) => (
							<Field className="col-span-3">
								<FieldLabel>Cân nặng (Sau khi đóng gói)</FieldLabel>
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
					</group.AppField>
					<Label className="col-span-3">
						Kích thước đóng gói (Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập
						sai kích thước)
					</Label>
					<group.AppField name="long">
						{(field) => (
							<Field className="col-span-1">
								<InputGroup>
									<InputGroupInput
										type="number"
										value={field.state.value}
										onChange={(e) =>
											field.handleChange(Number(e.currentTarget.value))
										}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupText>cm</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Field>
						)}
					</group.AppField>
					<group.AppField name="wide">
						{(field) => (
							<Field className="col-span-1">
								<InputGroup>
									<InputGroupInput
										type="number"
										value={field.state.value}
										onChange={(e) =>
											field.handleChange(Number(e.currentTarget.value))
										}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupText>cm</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Field>
						)}
					</group.AppField>
					<group.AppField name="high">
						{(field) => (
							<Field className="col-span-1">
								<InputGroup>
									<InputGroupInput
										type="number"
										value={field.state.value}
										onChange={(e) =>
											field.handleChange(Number(e.currentTarget.value))
										}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupText>cm</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
							</Field>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
