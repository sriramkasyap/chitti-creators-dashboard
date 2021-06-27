import React from "react";
import CKEditor from "react-ckeditor-component";
import { Flex } from "@chakra-ui/react";

import classes from "./RichTextEditor.module.scss";

const RichTextEditor = ({ data, handleChange }) => {
  return (
    <Flex id="editor" w="100%">
      <CKEditor
        activeClass={classes["ck-editor-container"]}
        content={data}
        events={{
          change: handleChange,
        }}
      />
    </Flex>
  );
};

export default RichTextEditor;
