import { PlusIcon, XIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import FileInput from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import type { ProductFormType } from "@/types/product";

interface ProductThumbnailProps {
	form: UseFormReturn<ProductFormType>;
}

export default function ProductThumbnail({ form }: ProductThumbnailProps) {
	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Ảnh bìa</CardTitle>
			</CardHeader>
			<CardContent>
				<FormField
					control={form.control}
					name="thumbnail"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FileInput
									value={field.value}
									mode="single"
									render={({ files, handleOpen, handleRemove }) =>
										files[0]?.id ? (
											<div className="relative group flex items-center justify-center w-full aspect-square rounded-md overflow-hidden">
												<img
													src={files[0]?.url}
													alt=""
													className="w-full h-full object-cover"
												/>
												<Button
													variant="ghost"
													size="icon"
													className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 bg-white size-6"
													onClick={() => handleRemove?.(files[0]?.id ?? "")}
												>
													<XIcon />
												</Button>
											</div>
										) : (
											<Button
												type="button"
												variant="ghost"
												className="w-full border border-dashed h-80"
												onClick={handleOpen}
											>
												<span>Ảnh bìa</span>
												<PlusIcon />
											</Button>
										)
									}
									onChange={field.onChange}
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
