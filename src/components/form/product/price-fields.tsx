import { NumericFormat } from "react-number-format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { withFieldGroup } from "./hooks/form";

export const PriceFields = withFieldGroup({
	defaultValues: {
		originPrice: 0,
		salePrice: 0,
	},
	render: ({ group }) => {
		return (
			<Card className="shadow-none border-0">
				<CardHeader>
					<CardTitle>Giá sản phẩm</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-2 gap-4">
					<group.AppField name="originPrice">
						{(field) => (
							<Field>
								<FieldLabel>Giá gốc</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<InputGroupText>$</InputGroupText>
									</InputGroupAddon>
									<NumericFormat
										value={field.state.value}
										thousandSeparator
										customInput={InputGroupInput}
										onValueChange={(v) => field.handleChange(Number(v.value))}
									/>
								</InputGroup>
							</Field>
						)}
					</group.AppField>
					<group.AppField name="salePrice">
						{(field) => (
							<Field>
								<FieldLabel>Giá bán</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<InputGroupText>$</InputGroupText>
									</InputGroupAddon>
									<NumericFormat
										value={field.state.value}
										thousandSeparator
										customInput={InputGroupInput}
										onValueChange={(v) => field.handleChange(Number(v.value))}
									/>
								</InputGroup>
							</Field>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
