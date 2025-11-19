import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { NumericFormat } from "react-number-format";
import { withFieldGroup } from "./hooks/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export const ConditionFields = withFieldGroup({
  defaultValues: {
    customer_type: "",
    amount_type: "",
    customer: "",
    amount: 0,
    quantity: 0,
    has_usage_limit: false as CheckedState,
    has_per_customer_limit: false as CheckedState,
    usage_limit: 0,
    per_customer_limit: 0,
  },
  render: ({ group }) => {
    return (
      <div className="space-y-4">
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-4">
            <group.AppField name="customer_type">
              {(field) => (
                <Field>
                  <FieldLabel>Đủ điều kiện</FieldLabel>
                  <RadioGroup
                    defaultValue={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="" />
                      <Label>Tất cả khách hàng</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="specific" />
                      <Label>Khách hàng cụ thể</Label>
                    </div>
                  </RadioGroup>
                </Field>
              )}
            </group.AppField>
            <group.Subscribe selector={(state) => state.values.customer_type}>
              {(state) =>
                state === "specific" && (
                  <div>
                    <Button type="button" variant="outline">
                      Chọn khách hàng
                    </Button>
                  </div>
                )
              }
            </group.Subscribe>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none">
          <CardContent>
            <group.AppField name="amount_type">
              {(field) => (
                <Field>
                  <FieldLabel>Yêu cầu mua hàng tối thiểu</FieldLabel>
                  <RadioGroup
                    defaultValue={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="" />
                      <Label>Không có yêu cầu tối thiểu</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="order_amount" />
                      <Label>Số tiền mua tối thiểu (₫)</Label>
                    </div>
                    <group.Subscribe
                      selector={(state) => state.values.amount_type}
                    >
                      {(state) =>
                        state === "order_amount" && (
                          <group.AppField name="amount">
                            {(field) => (
                              <InputGroup>
                                <InputGroupAddon>
                                  <InputGroupText>$</InputGroupText>
                                </InputGroupAddon>
                                <NumericFormat
                                  value={field.state.value}
                                  thousandSeparator
                                  customInput={InputGroupInput}
                                  onValueChange={(v) =>
                                    v.floatValue &&
                                    field.handleChange(v.floatValue)
                                  }
                                />
                              </InputGroup>
                            )}
                          </group.AppField>
                        )
                      }
                    </group.Subscribe>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="quantity" />
                      <Label>Số lượng mặt hàng tối thiểu</Label>
                    </div>
                    <group.Subscribe
                      selector={(state) => state.values.amount_type}
                    >
                      {(state) =>
                        state === "quantity" && (
                          <group.AppField name="quantity">
                            {(field) => (
                              <NumericFormat
                                customInput={Input}
                                value={field.state.value}
                                onValueChange={(v) =>
                                  v.floatValue &&
                                  field.handleChange(v.floatValue)
                                }
                              />
                            )}
                          </group.AppField>
                        )
                      }
                    </group.Subscribe>
                  </RadioGroup>
                </Field>
              )}
            </group.AppField>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none">
          <CardContent>
            <Field>
              <FieldLabel>Sử dụng chiết khấu tối đa</FieldLabel>
              <group.AppField name="has_usage_limit">
                {(field) => (
                  <Field orientation="horizontal">
                    <Checkbox
                      defaultChecked={field.state.value}
                      onCheckedChange={field.handleChange}
                    />
                    <FieldLabel>Tổng lượt sử dụng tối đa</FieldLabel>
                  </Field>
                )}
              </group.AppField>
              <group.Subscribe
                selector={(state) => state.values.has_usage_limit}
              >
                {(state) =>
                  state && (
                    <group.AppField name="usage_limit">
                      {(field) => (
                        <NumericFormat
                          value={field.state.value}
                          onValueChange={(v) =>
                            v.floatValue && field.handleChange(v.floatValue)
                          }
                          customInput={Input}
                        />
                      )}
                    </group.AppField>
                  )
                }
              </group.Subscribe>
              <group.AppField name="has_per_customer_limit">
                {(field) => (
                  <Field orientation="horizontal">
                    <Checkbox
                      defaultChecked={field.state.value}
                      onCheckedChange={field.handleChange}
                    />
                    <FieldLabel>Lượt sử dụng tối đa/Người mua</FieldLabel>
                  </Field>
                )}
              </group.AppField>
              <group.Subscribe
                selector={(state) => state.values.has_per_customer_limit}
              >
                {(state) =>
                  state && (
                    <group.AppField name="per_customer_limit">
                      {(field) => (
                        <NumericFormat
                          value={field.state.value}
                          onValueChange={(v) =>
                            v.floatValue && field.handleChange(v.floatValue)
                          }
                          customInput={Input}
                        />
                      )}
                    </group.AppField>
                  )
                }
              </group.Subscribe>
            </Field>
          </CardContent>
        </Card>
      </div>
    );
  },
});
