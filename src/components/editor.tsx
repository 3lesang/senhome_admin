import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function Editor() {
  return (
    <SunEditor
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
