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
import type { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface Props {
  editor: Editor;
}

export default ({ editor }: Props) => {
  const form = useForm({
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = (data: any) => {
    const { url } = data;
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url">Link to</FormLabel>
                  <FormControl>
                    <Input id="url" {...field} placeholder="http://" />
                  </FormControl>
                  <FormDescription>
                    Link sẽ được chèn vào nội dung đã chọn
                  </FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Chèn Link</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
