import React from "react";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box } from "@chakra-ui/react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

import { noop } from "../../../utils";

import classes from "./RichTextEditor.module.scss";

const RichTextEditor = ({ data, handleChange }) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "fontfamily",
        "fontsize",
        "|",
        "alignment",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "subscript",
        "superscript",
        "|",
        "link",
        "|",
        "outdent",
        "indent",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "|",
        "code",
        "codeBlock",
        "|",
        "insertTable",
        "|",
        "uploadImage",
        "blockQuote",
        "|",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
    },
  };
  return (
    <Box id="editor" w="100%">
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        content={data}
        onChange={handleChange}
        activeClass={classes["ck-editor-container"]}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              window.innerWidth > 992 ? "500px" : "400px",
              editor.editing.view.document.getRoot()
            );
            editor.setData(data);
          });
        }}
      />
    </Box>
  );
};

RichTextEditor.propTypes = {
  data: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
};

RichTextEditor.defaultProps = {
  handleChange: noop,
};

export default RichTextEditor;
