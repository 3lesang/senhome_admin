import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
	files: z.array(z.object({ id: z.string(), url: z.string() })),
});

export type ProductFileFormValuesType = z.infer<typeof schema>;

export function ProductFileForm() {
	const [open, setOpen] = useState(false);
	const form = useForm<ProductFileFormValuesType>({
		defaultValues: {
			files: [],
		},
	});

	const { fields, remove, replace } = useFieldArray({
		control: form.control,
		name: "files",
		keyName: "key",
	});

	const files = useWatch({ control: form.control, name: "files" });

	const handleConfirm = (files: { id: string; url: string }[]) => {
		replace(files);
	};

	const handleRemove = (index: number) => {
		remove(index);
	};

	return (
		<div>
			{fields.length === 0 ? (
				<div className="flex justify-center items-center border border-dashed h-32 rounded-md bg-neutral-50/10 hover:bg-neutral-50/30">
					<div className="space-y-2">
						<div className="space-x-2">
							<Button type="button" variant="outline" size="sm">
								Tải ảnh mới
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => setOpen(true)}
							>
								Chọn ảnh có sẵn
							</Button>
						</div>
						<p className="text-sm text-center">Chấp nhận hình ảnh, video</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-6 gap-1">
					{fields.map((item, index) => (
						<div
							key={item.key}
							data-swapy-slot={index}
							className={cn(
								"bg-gray-50 h-fit rounded-md",
								index === 0 && "col-span-2 row-span-2",
							)}
						>
							<div
								className="h-full aspect-square overflow-hidden bg-center bg-cover relative group rounded-md"
								style={{ backgroundImage: `url(${item.url})` }}
							>
								<Button
									type="button"
									variant="outline"
									size="icon"
									className="absolute top-1 right-1 size-6 opacity-0 group-hover:opacity-100 rounded-full"
									onClick={() => handleRemove(index)}
								>
									<XIcon />
								</Button>
							</div>
						</div>
					))}
					<button
						type="button"
						className="flex justify-center items-center border border-dashed bg-neutral-50/10 relative aspect-square rounded-md hover:bg-neutral-50/30"
						onClick={() => setOpen(true)}
					>
						<PlusIcon size={16} />
					</button>
				</div>
			)}
			<FileDialog
				open={open}
				onOpenChange={setOpen}
				value={files}
				onConfirm={handleConfirm}
				multiple
			/>
		</div>
	);
}
