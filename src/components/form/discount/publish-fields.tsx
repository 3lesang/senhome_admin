import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withFieldGroup } from "./hooks/form";

export const PublishFields = withFieldGroup({
  defaultValues: {
    status: "",
  },
  render: ({ group }) => {
    return (
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>Trạng thái</CardTitle>
        </CardHeader>
        <CardContent>
          <group.AppField name="status">
            {(field) => (
              <Select
                value={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="scheduled">Theo lịch trình</SelectItem>
                  <SelectItem value="expired">Hết hạn</SelectItem>
                </SelectContent>
              </Select>
            )}
          </group.AppField>
        </CardContent>
      </Card>
    );
  },
});
