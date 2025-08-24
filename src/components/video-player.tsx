import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  useMediaStore,
} from "@vidstack/react";

import "@vidstack/react/player/styles/base.css";

import { useRef, type PointerEvent } from "react";

import { Button } from "@/components/ui/button";
import { useMediaRemote } from "@vidstack/react";
import { PauseIcon, PlayIcon } from "lucide-react";

interface Props {
  src?: string;
}

export default ({ src }: Props) => {
  const player = useRef<MediaPlayerInstance>(null);
  const { playing } = useMediaStore(player);
  const remote = useMediaRemote();

  const handleClick = ({ nativeEvent }: PointerEvent) => {
    if (playing) remote.pause(nativeEvent);
    else remote.play(nativeEvent);
  };

  return (
    <MediaPlayer
      ref={player}
      src={src}
      className="group rounded-md"
      playsInline
    >
      <MediaProvider>
        <Poster className="absolute inset-0 block h-full w-full opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.01]" />
        <Button
          variant="secondary"
          size="icon"
          onPointerUp={handleClick}
          className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 size-8"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </MediaProvider>
    </MediaPlayer>
  );
};
