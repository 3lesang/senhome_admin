import type { Editor } from "@tiptap/react";
import { PlayIcon } from "lucide-react";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import VideoPlayer from "@/components/video-player";

interface Props {
	editor: Editor;
}
export default ({ editor }: Props) => {
	const form = useForm({
		defaultValues: {
			src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
	});

	const src = form.watch("src");

	const handleAddVideo = () => {
		editor.commands.setYoutubeVideo({
			src,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" type="button">
					<PlayIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chèn video</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form>
						<FormField
							control={form.control}
							name="src"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Video URL</FormLabel>
									<FormControl>
										<Input
											placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				{src && <VideoPlayer src={src} />}
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Hủy</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" onClick={handleAddVideo}>
							Chèn Video
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
