import { CollectionDialog } from "@/components/dialog/collection";
import { ProductDialog } from "@/components/dialog/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { NumericFormat } from "react-number-format";
import { withFieldGroup } from "./hooks/form";

export const ValueField = withFieldGroup({
  defaultValues: {
    type: "",
    percent_value: 0,
    fixed_value: 0,
    apply_to: "",
    products: [] as { id: number; file: string; name: string }[],
    collections: [] as { id: number; file: string; name: string }[],
  },
  render: ({ group }) => {
    return (
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>Giá trị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <group.AppField name="type">
                {(field) => (
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Phần trăm</SelectItem>
                      <SelectItem value="fixed">Số tiền cố định</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </group.AppField>
              <group.Subscribe selector={(state) => state.values.type}>
                {(type) =>
                  type === "percent" ? (
                    <group.AppField name="percent_value">
                      {(field) => (
                        <InputGroup>
                          <InputGroupAddon>
                            <InputGroupText>%</InputGroupText>
                          </InputGroupAddon>
                          <NumericFormat
                            value={field.state.value}
                            thousandSeparator
                            customInput={InputGroupInput}
                            onValueChange={(v) =>
                              v.floatValue && field.handleChange(v.floatValue)
                            }
                          />
                        </InputGroup>
                      )}
                    </group.AppField>
                  ) : (
                    <group.AppField name="fixed_value">
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
                              v.floatValue && field.handleChange(v.floatValue)
                            }
                          />
                        </InputGroup>
                      )}
                    </group.AppField>
                  )
                }
              </group.Subscribe>
            </div>
          </FieldGroup>
          <group.AppField name="apply_to">
            {(field) => (
              <Field>
                <FieldLabel>Áp dụng cho</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả sản phẩm</SelectItem>
                    <SelectItem value="specific_collections">
                      Nhóm sản phẩm cụ thể
                    </SelectItem>
                    <SelectItem value="specific_products">
                      Sản phẩm cụ thể
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </group.AppField>
          <group.Subscribe selector={(state) => state.values.apply_to}>
            {(state) =>
              state === "specific_collections" && (
                <group.AppField name="collections">
                  {(field) => (
                    <>
                      <CollectionDialog
                        value={field.state.value}
                        onConfirm={field.handleChange}
                      >
                        <Button type="button" variant="outline">
                          Chọn nhóm sản phẩm
                        </Button>
                      </CollectionDialog>
                      <div className="space-y-4">
                        {field.state.value.map((i) => (
                          <Button
                            type="button"
                            className="w-full"
                            variant="secondary"
                          >
                            <Link
                              className="hover:underline"
                              to="/products/collections/$id"
                              params={{ id: i.id.toString() }}
                            >
                              {i.name}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </>
                  )}
                </group.AppField>
              )
            }
          </group.Subscribe>
          <group.Subscribe selector={(state) => state.values.apply_to}>
            {(state) =>
              state === "specific_products" && (
                <group.AppField name="products">
                  {(field) => (
                    <>
                      <ProductDialog
                        value={field.state.value}
                        onConfirm={field.handleChange}
                      >
                        <Button type="button" variant="outline">
                          Chọn sản phẩm
                        </Button>
                      </ProductDialog>
                      <div className="space-y-4">
                        {field.state.value.map((i) => (
                          <Button
                            type="button"
                            className="w-full"
                            variant="secondary"
                          >
                            <Link
                              className="hover:underline"
                              to="/products/$id/update"
                              params={{ id: i.id.toString() }}
                            >
                              {i.name}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </>
                  )}
                </group.AppField>
              )
            }
          </group.Subscribe>
        </CardContent>
      </Card>
    );
  },
});
