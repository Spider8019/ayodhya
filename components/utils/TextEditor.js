import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { useRouter } from "next/router";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

export default function IndexPage({content,setContent}) {

  return (
    <div className="w-full">
      <SunEditor
        name="content"
        // className="sun-editor-editable"
        defaultValue={content}
        onChange={(text) => setContent(text)}
        setOptions={{
          height: 200,
          width:"100%",
          defaultStyle:"font-family:Noto Sans Display",
          buttonList: [
            [
              "fullScreen",
              "formatBlock",
              "font",
              "fontSize",
              "fontColor",
              "hiliteColor",
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "textStyle",
              "align",
              "blockquote",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "lineHeight",
              "table",
             ],
            ["link", "image", "video","audio"]
          ]
        }}
      />
    </div>
  );
}
