import VideoPlayer from "@/features/media/components/video-player";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    videoComponent: {
      /**
       * Insert a new video component node with the given `src`
       */
      setVideoComponent: (options: { src: string }) => ReturnType;
    };
  }
}

/**
 * React component used inside the editor (NodeView)
 */
function VideoNodeView({ node }: any) {
  return (
    <NodeViewWrapper className="video-node">
      <VideoPlayer src={node.attrs.src} />
    </NodeViewWrapper>
  );
}

/**
 * Tiptap Node Extension for Video Components
 */
const VideoComponent = Node.create({
  name: "videoComponent",

  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // Fallback HTML (SSR / when rendering outside of React editor)
    return ["video-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView);
  },

  addCommands() {
    return {
      /**
       * Insert a new video component with given src
       */
      setVideoComponent:
        (options: { src: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default VideoComponent;
