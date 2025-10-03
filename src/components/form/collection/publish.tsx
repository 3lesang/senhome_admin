import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { CollectionFormValuesType } from ".";

interface CollectionPublishProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export default function CollectionPublish({ form }: CollectionPublishProps) {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const id = useId();
	console.log(form);
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Hiển thị</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-3">
					<Checkbox id={id} />
					<Label htmlFor={id}>Website</Label>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button type="button" variant="ghost" className="ml-auto">
								{date ? date.toLocaleDateString() : "Select date"}
								<CalendarIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								mode="single"
								selected={date}
								captionLayout="dropdown"
								onSelect={setDate}
							/>
							<Input type="time" className="text-center" />
							<Separator className="my-2" />
							<div className="flex gap-2 justify-end">
								<Button variant="outline">Cancel</Button>
								<Button>Apply</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</CardContent>
		</Card>
	);
}
