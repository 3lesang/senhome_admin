import { CalendarClockIcon } from "lucide-react";
import { useState } from "react";
import ScheduleDialog from "@/components/dialog/schedule";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScheduleInputProps {
	value?: Date | null | undefined;
	onChange?: (value: Date) => void;
}

export default function ScheduleInput({ value, onChange }: ScheduleInputProps) {
	const [date, setDate] = useState<Date | null | undefined>(value);
	function handleConfirm(value: Date) {
		setDate(value);
		onChange?.(value);
	}
	return (
		<div className={cn(buttonVariants({ variant: "ghost" }), "w-full")}>
			Webiste
			<p className="ml-auto">
				{date?.toLocaleString("vi-VN", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})}
			</p>
			<ScheduleDialog onConfirm={handleConfirm}>
				<Button type="button" size="icon" variant="ghost" className="ml-auto">
					<CalendarClockIcon />
				</Button>
			</ScheduleDialog>
		</div>
	);
}
