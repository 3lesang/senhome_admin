import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Editor } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  editor: Editor;
}

export default ({ editor }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="select-none" type="button">
          Paragraph
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Paragraph
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
              Heading 1
            </h1>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Heading 3
            </h3>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Heading 4
            </h4>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <h5 className="text-lg font-semibold tracking-tight">Heading 5</h5>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            type="button"
            className="w-full justify-start px-4"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <h6 className="text-base font-medium tracking-tight text-gray-700">
              Heading 6
            </h6>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
