import { PlusIcon, XIcon } from "lucide-react";
import {
	type Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import {
	type UseFormReturn,
	useFieldArray,
	useForm,
	useWatch,
} from "react-hook-form";
import { createSwapy, type SwapEndEvent, type Swapy } from "swapy";
import z from "zod";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const schema = z.object({
	files: z.array(z.object({ id: z.string(), url: z.string() })),
});

export type ProductFileFormValuesType = z.infer<typeof schema>;

interface ProductFileFormProps {
	ref?: Ref<UseFormReturn<ProductFileFormValuesType>>;
	defaultValues?: ProductFileFormValuesType;
}

export function ProductFileForm({ ref, defaultValues }: ProductFileFormProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<ProductFileFormValuesType>({
		defaultValues: {
			files: defaultValues?.files ?? [],
		},
	});

	useImperativeHandle(ref, () => form);

	const { fields, remove, replace } = useFieldArray({
		control: form.control,
		name: "files",
		keyName: "key",
	});

	const swapyRef = useRef<Swapy | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const files = useWatch({ control: form.control, name: "files" });

	const handleConfirm = (files: { id: string; url: string }[]) => {
		replace(files);
		if (swapyRef.current) {
			swapyRef.current.update();
		}
	};

	const handleRemove = (index: number) => {
		remove(index);
		if (swapyRef.current) {
			swapyRef.current.update();
		}
	};

	const handleSwapEnd = useCallback(
		(event: SwapEndEvent) => {
			if (!event.hasChanged) return;
			const newOrder = event.slotItemMap.asArray.map(
				({ item }) => files[Number(item)],
			);
			replace(newOrder);
		},
		[files, replace],
	);

	useEffect(() => {
		if (!containerRef.current) return;

		const swapy = createSwapy(containerRef.current);
		swapyRef.current = swapy;

		swapy.onSwapEnd(handleSwapEnd);

		return () => {
			swapy.destroy();
			swapyRef.current = null;
		};
	}, [handleSwapEnd]);

	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Hình ảnh sản phẩm</CardTitle>
			</CardHeader>
			<CardContent ref={containerRef}>
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
								<div data-swapy-item={index}>
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
			</CardContent>
		</Card>
	);
}
