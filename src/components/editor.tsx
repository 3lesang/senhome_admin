import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

interface EditorProps {
  defaultValue?: string;
  onChange?: (content: string) => void;
}
export default function Editor({ defaultValue, onChange }: EditorProps) {
  return (
    <SunEditor
      defaultValue={defaultValue}
      onChange={onChange}
      setOptions={{
        buttonList: [
          // ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["removeFormat"],
          ["fontColor", "hiliteColor"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
          // ["preview", "print"],
        ],
      }}
    />
  );
}
