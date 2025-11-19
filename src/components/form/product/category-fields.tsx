import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { withFieldGroup } from "./hooks/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "@/queries/category";

export const CategoryFields = withFieldGroup({
  defaultValues: {
    categoryID: 0,
  },
  render: ({ group }) => {
    const getCategoriesQuery = useQuery(
      getCategoriesQueryOptions({ page: 1, limit: 100 }),
    );
    return (
      <Card className="shadow-none border-0">
        <CardHeader>
          <CardTitle>Danh mục sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <group.AppField name="categoryID">
            {(field) => (
              <Field>
                <FieldLabel>Loại</FieldLabel>
                <Select
                  defaultValue={field.state.value.toString()}
                  onValueChange={(value) => field.handleChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getCategoriesQuery.data?.data.data?.map((i) => (
                      <SelectItem key={i.id} value={i.id.toString()}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </group.AppField>
        </CardContent>
      </Card>
    );
  },
});
