import Video from "@/components/editor/extensions/video";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extensions";
import { BulletList, OrderedList } from "@tiptap/extension-list";

export const extensions = [
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Underline,
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Placeholder.configure({
    placeholder: "Nhập nội dung…",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Image,
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  Video,
  BulletList,
  OrderedList,
];
