import { PlusIcon } from "lucide-react";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
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
							<FormLabel>Media</FormLabel>
							<FormControl>
								<FileInput
									value={field.value}
									mode="multiple"
									onChange={field.onChange}
									render={({ files, handleOpen }) => (
										<Button
											type="button"
											variant="ghost"
											className={cn(
												"border border-dashed h-20 min-w-20",
												files.length === 0 && "flex-1",
											)}
											onClick={handleOpen}
										>
											<PlusIcon />
										</Button>
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
