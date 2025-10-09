import { type ReactNode, useState } from "react";
import { vi } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ScheduleDialogProps {
	children: ReactNode;
	onConfirm?: (datetime: Date) => void;
}

export default function ScheduleDialog({
	children,
	onConfirm,
}: ScheduleDialogProps) {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [time, setTime] = useState<string>("11:30:00");

	const handleConfirm = () => {
		if (date) {
			const [hours, minutes, seconds] = time.split(":").map(Number);
			const finalDate = new Date(date);
			finalDate.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0);

			onConfirm?.(finalDate);
		}
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Lên lịch xuất bản</DialogTitle>
					<DialogDescription>
						Lên lịch sản phẩm sẽ được xuất bản vào ngày và giờ này
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					<Button type="button" variant="outline" className="w-full">
						{date?.toLocaleDateString("vi-VN", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
						})}
					</Button>

					<Input
						value={time}
						type="time"
						className="text-center"
						onChange={(e) => setTime(e.currentTarget.value)}
					/>

					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={setDate}
						className="w-full"
						locale={vi}
					/>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Hủy
						</Button>
					</DialogClose>
					<Button type="button" onClick={handleConfirm}>
						Xác nhận
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
