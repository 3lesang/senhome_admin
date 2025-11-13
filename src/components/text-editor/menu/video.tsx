import type { Editor } from "@tiptap/react";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import VideoPlayer from "@/components/video-player";

interface Props {
  editor: Editor;
}

export function EditorVideoButton({ editor }: Props) {
  const [src, setSrc] = useState("");

  const handleAddVideo = () => {
    editor.commands.setYoutubeVideo({
      src,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" type="button">
          <PlayIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chèn video</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          onChange={(e) => setSrc(e.currentTarget.value)}
        />
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
}
