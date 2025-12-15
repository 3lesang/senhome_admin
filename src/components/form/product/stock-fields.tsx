import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { withFieldGroup } from "./hooks/form";

export const StockFields = withFieldGroup({
  defaultValues: {
    stock: 0,
    sku: ""
  },
  render: ({ group }) => {
    return (
      <Card className="shadow-none border-0">
        <CardHeader>
          <CardTitle>Tồn kho</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <group.AppField name="stock">
            {(field) => {

              return (
                <Field className="col-span-2">
                  <FieldLabel>Tồn kho</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </Field>
              );
            }}
          </group.AppField>
          <group.AppField name="sku">
            {(field) => (
              <Field className="col-span-2">
                <FieldLabel>SKU</FieldLabel>
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
