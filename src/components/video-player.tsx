import ReactPlayer from "react-player";

interface VideoPlayerProps {
	src?: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
	return (
		<ReactPlayer
			src={src}
			controls={true}
			style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
		/>
	);
}
