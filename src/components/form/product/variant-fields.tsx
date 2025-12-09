import { GripVerticalIcon, PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { NumericFormat } from "react-number-format";
import type z from "zod";
import { VariantImageInput } from "@/components/form/product/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateDiscount } from "@/lib/utils";
import { withFieldGroup } from "./hooks/form";
import { generateOptions, type VariantSchema } from "./variant";

export const VariantFields = withFieldGroup({
  defaultValues: {
    options: [] as {
      id?: number;
      name: string;
      values?: { id?: number; name: string }[];
    }[],
    variants: [] as {
      id?: number;
      file: string;
      origin_price: number;
      sale_price: number;
      discount: number;
      stock: number;
      sku: string;
      options: { option_name: string; value: string }[];
    }[],
    variantOptions: [[]] as { option_name: string; value: string }[][],
  },
  render: ({ group }) => {
    return (
      <Card className="shadow-none border-0">
        <CardHeader>
          <CardTitle>Biến thể</CardTitle>
        </CardHeader>
        <CardContent>
          <group.AppField name="options" mode="array">
            {(oField) => (
              <div className="space-y-4">
                {oField.state.value?.map((o, i) => (
                  <div key={`${o.name}${i}`} className="space-y-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => oField.removeValue(i)}
                    >
                      <XIcon />
                    </Button>
                    <group.AppField name={`options[${i}].name`}>
                      {(field) => (
                        <Field data-invalid={!field.state.meta.isValid}>
                          <FieldLabel>Thuộc tính</FieldLabel>
                          <Input
                            aria-invalid={!field.state.meta.isValid}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="vd: kích thước, màu sắc,..."
                          />
                          {!field.state.meta.isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )}
                    </group.AppField>
                    <group.AppField name={`options[${i}].values`} mode="array">
                      {(vField) => (
                        <Field>
                          <FieldLabel>Giá trị</FieldLabel>
                          <div className="grid grid-cols-2 gap-4">
                            {vField.state.value?.map((v, vIdx) => (
                              <group.AppField
                                key={`${v.name}${vIdx}`}
                                name={`options[${i}].values[${vIdx}].name`}
                              >
                                {(field) => (
                                  <Field>
                                    <ButtonGroup className="w-full">
                                      <Button type="button" variant="outline">
                                        <GripVerticalIcon />
                                      </Button>
                                      <Input
                                        aria-invalid={!field.state.meta.isValid}
                                        value={field.state.value}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        onBlur={() => {
                                          const value = field.state.value;
                                          if (!value) return;
                                          oField.handleBlur();
                                        }}
                                        placeholder="Thêm giá trị mới"
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                          vField.removeValue(vIdx);
                                          oField.handleBlur();
                                        }}
                                      >
                                        <Trash2Icon />
                                      </Button>
                                    </ButtonGroup>
                                    {!field.state.meta.isValid && (
                                      <FieldError
                                        errors={field.state.meta.errors}
                                      />
                                    )}
                                  </Field>
                                )}
                              </group.AppField>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => vField.pushValue({ name: "" })}
                            >
                              <PlusIcon />
                              Thêm giá trị mới
                            </Button>
                          </div>
                        </Field>
                      )}
                    </group.AppField>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => oField.pushValue({ name: "" })}
                >
                  <PlusIcon />
                  Thêm thuộc tính khác
                </Button>
              </div>
            )}
          </group.AppField>
          <group.AppField
            name="variantOptions"
            validators={{
              onBlurListenTo: ["options"],
              onBlur: () => {
                const options = group.state.values.options;
                const variants = group.state.values.variants;
                const variantOptions = generateOptions(options);
                const newVariant = variantOptions.map((vo, i) => {
                  const existVariant = variants[i];
                  const variant: z.infer<typeof VariantSchema>[number] = {
                    id: existVariant?.id ?? 0,
                    origin_price: existVariant?.origin_price ?? 0,
                    sale_price: existVariant?.sale_price ?? 0,
                    discount: 0,
                    stock: existVariant?.stock ?? 0,
                    sku: existVariant?.sku ?? "",
                    file: existVariant?.file ?? "",
                    options: vo,
                  };
                  return variant;
                });
                group.setFieldValue("variants", newVariant);
              },
            }}
          >
            {() => <></>}
          </group.AppField>
          <group.AppField name="variants" mode="array">
            {(field) => (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Biến thể</TableHead>
                    <TableHead>Giá gốc</TableHead>
                    <TableHead>Giá bán</TableHead>
                    <TableHead>Giảm giá</TableHead>
                    <TableHead>Tồn kho</TableHead>
                    <TableHead>SKU</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {field.state.value?.map((v, i) => (
                    <TableRow key={`${v.id}${i}`}>
                      <TableCell>
                        <div className="space-y-1">
                          <group.AppField name={`variants[${i}].file`}>
                            {(field) => (
                              <VariantImageInput
                                value={field.state.value}
                                onChange={field.handleChange}
                              />
                            )}
                          </group.AppField>
                          <group.AppField name={`variants[${i}].options`}>
                            {(field) => (
                              <div className="space-x-2">
                                {field.state.value?.map((i) => (
                                  <Badge key={i.value} variant="secondary">
                                    {i.value}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </group.AppField>
                        </div>
                      </TableCell>
                      <TableCell>
                        <group.AppField name={`variants[${i}].origin_price`}>
                          {(field) => (
                            <NumericFormat
                              className="bg-white"
                              thousandSeparator
                              prefix="đ "
                              customInput={Input}
                              inputMode="decimal"
                              value={field.state.value}
                              onValueChange={(values) =>
                                field.handleChange(Number(values.value))
                              }
                            />
                          )}
                        </group.AppField>
                      </TableCell>
                      <TableCell>
                        <group.AppField name={`variants[${i}].sale_price`}>
                          {(field) => (
                            <NumericFormat
                              className="bg-white"
                              thousandSeparator
                              prefix="đ "
                              customInput={Input}
                              inputMode="decimal"
                              value={field.state.value}
                              onValueChange={(values) =>
                                field.handleChange(Number(values.value))
                              }
                            />
                          )}
                        </group.AppField>
                      </TableCell>
                      <TableCell>
                        <group.AppField
                          name={`variants[${i}].discount`}
                          validators={{
                            onChangeListenTo: [
                              `variants[${i}].origin_price`,
                              `variants[${i}].sale_price`,
                            ],
                          }}
                        >
                          {() => (
                            <Badge variant="secondary">
                              {calculateDiscount(
                                group.getFieldValue(
                                  `variants[${i}].origin_price`,
                                ) ?? 0,
                                group.getFieldValue(
                                  `variants[${i}].sale_price`,
                                ) ?? 0,
                              )}
                              %
                            </Badge>
                          )}
                        </group.AppField>
                      </TableCell>
                      <TableCell>
                        <group.AppField name={`variants[${i}].stock`}>
                          {(field) => (
                            <NumericFormat
                              className="bg-white"
                              thousandSeparator
                              customInput={Input}
                              inputMode="decimal"
                              value={field.state.value}
                              onValueChange={(values) =>
                                field.handleChange(Number(values.value))
                              }
                            />
                          )}
                        </group.AppField>
                      </TableCell>
                      <TableCell>
                        <group.AppField name={`variants[${i}].sku`}>
                          {(field) => (
                            <Input
                              className="bg-white"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          )}
                        </group.AppField>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </group.AppField>
        </CardContent>
      </Card>
    );
  },
});
