import { PlusIcon } from "lucide-react";
import FileInput from "@/components/file-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

function ProductMedia() {
	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Media</CardTitle>
			</CardHeader>
			<CardContent>
				<FormField
					name="media"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FileInput
									value={field.value}
									mode="multiple"
									onChange={field.onChange}
									render={({ files, handleOpen }) => (
										<div
											className={cn(
												"border border-dashed w-full rounded-md flex justify-center items-center hover:bg-gray-50 relative",
												files.length === 0 ? "col-span-8 h-32" : "aspect-square",
											)}
										>
											<button
												type="button"
												className="absolute inset-0"
												onClick={handleOpen}
											></button>
											<PlusIcon className="text-gray-500 size-4" />
										</div>
									)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}

export default ProductMedia;
