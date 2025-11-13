import { TextEditor } from "@/components/text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { withFieldGroup } from "./hooks/form";

export const InfoFields = withFieldGroup({
  defaultValues: {
    name: "",
    description: {},
  },
  render: ({ group }) => {
    return (
      <Card className="shadow-none border-0">
        <CardHeader>
          <CardTitle>Thông tin chung</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <group.AppField name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="col-span-2">
                  <FieldLabel>Tên sản phẩm</FieldLabel>
                  <Input
                    placeholder="Tên sản phẩm"
                    aria-invalid={isInvalid}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </group.AppField>
          <group.AppField name="description">
            {(field) => (
              <Field className="col-span-2">
                <FieldLabel>Mô tả sản phẩm</FieldLabel>
                <TextEditor
                  value={field.state.value}
                  onChange={field.handleChange}
                />
              </Field>
            )}
          </group.AppField>
          {/*<group.AppField name="categoryID">
						{() => (
							<Field className="col-span-1">
								<FieldLabel>Loại</FieldLabel>
							</Field>
						)}
					</group.AppField>*/}
        </CardContent>
      </Card>
    );
  },
});
