import type { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
	editor: Editor;
}

export default ({ editor }: Props) => {
	const form = useForm({
		defaultValues: {
			url: "",
		},
	});

	const url = form.watch("url");

	const handleSubmit = (url: string) => {
		try {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		} catch (e) {
			console.log(e);
		}
	};

	const id = useId();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => {
						form.setValue("url", editor.getAttributes("link").href || "");
					}}
				>
					<LinkIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chèn link</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4">
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="url">Link to</FormLabel>
									<FormControl>
										<Input id={id} {...field} placeholder="http://" />
									</FormControl>
									<FormDescription>
										Link sẽ được chèn vào nội dung đã chọn
									</FormDescription>
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Hủy
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" onClick={() => handleSubmit(url)}>
							Chèn Link
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
