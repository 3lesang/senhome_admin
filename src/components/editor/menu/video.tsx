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

import { PlayIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export default () => {
  const form = useForm({
    defaultValues: {
      url: "youtube/EvPEXA2iH4g",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const src = form.watch("url");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlayIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chèn video</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="youtube/id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <VideoPlayer src={src} />
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <DialogClose>
            <Button>Chèn Video</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
