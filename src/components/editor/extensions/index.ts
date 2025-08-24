import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Dropcursor, Placeholder } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";

export const extensions = [
  Placeholder.configure({
    placeholder: "Nhập nội dung…",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyleKit,
  StarterKit,
  Image,
  Link.configure({
    openOnClick: false,
    autolink: true,
    HTMLAttributes: {
      class: "text-blue-600 underline hover:text-blue-800",
    },
  }),
  Dropcursor,
];
