import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { withFieldGroup } from "./hooks/form";
import type { CheckedState } from "@radix-ui/react-checkbox";

interface DatePickerProps {
  value?: Date;
  onChange?: (value: Date) => void;
}

function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value ?? new Date());
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker"
          className="w-32 justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          onSelect={(value) => {
            setDate(value);
            value && onChange?.(value);
          }}
          selected={date}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}

export const ActiveFields = withFieldGroup({
  defaultValues: {
    start_date: new Date(),
    start_time: "",
    has_end: false as CheckedState,
    end_date: new Date(),
    end_time: "",
  },
  render: ({ group }) => {
    return (
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>Ngày hoạt động</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <group.AppField name="start_date">
            {(field) => (
              <Field className="col-span-6">
                <FieldLabel>Ngày bắt đầu</FieldLabel>
                <DatePicker
                  value={field.state.value}
                  onChange={field.handleChange}
                />
              </Field>
            )}
          </group.AppField>
          <group.AppField name="start_time">
            {(field) => (
              <Field className="col-span-6">
                <FieldLabel>Thời gian bắt đầu</FieldLabel>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                />
              </Field>
            )}
          </group.AppField>
          <group.AppField name="has_end">
            {(field) => (
              <Field orientation="horizontal" className="col-span-12">
                <Checkbox
                  defaultChecked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <FieldLabel>Đặt ngày kết thúc</FieldLabel>
              </Field>
            )}
          </group.AppField>
          <group.Subscribe selector={(state) => state.values.has_end}>
            {(state) =>
              state && (
                <>
                  <group.AppField name="end_date">
                    {(field) => (
                      <Field className="col-span-6">
                        <FieldLabel>Ngày bắt đầu</FieldLabel>
                        <DatePicker
                          value={field.state.value}
                          onChange={field.handleChange}
                        />
                      </Field>
                    )}
                  </group.AppField>
                  <group.AppField name="end_time">
                    {(field) => (
                      <Field className="col-span-6">
                        <FieldLabel>Thời gian bắt đầu</FieldLabel>
                        <Input
                          type="time"
                          id="time-picker"
                          step="1"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(e.currentTarget.value)
                          }
                        />
                      </Field>
                    )}
                  </group.AppField>
                </>
              )
            }
          </group.Subscribe>
        </CardContent>
      </Card>
    );
  },
});
