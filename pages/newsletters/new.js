import { useState } from "react";
// import parse from "html-react-parser"; // used to parse string to html
import { withIronSession } from "next-iron-session";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  IconButton,
  Badge,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import renderHTML from "react-render-html";
import Button from "../../src/components/common/Button/Button";
import RichTextEditor from "../../src/components/common/RichTextEditor/RichTextEditor";

import { checkAuthentication, getIronConfig } from "../../src/utils";

const CreateNewNewsletter = () => {
  const [editorData, setEditorData] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    keyword: "",
  });
  const [keywordsList, setKeywordsList] = useState([]);

  const handleInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddKeyword = () => {
    setKeywordsList([
      ...keywordsList,
      {
        id: Math.floor(100000 + Math.random() * 900000),
        text: formData.keyword,
      },
    ]);
    setFormData({
      ...formData,
      keyword: "",
    });
  };

  const handleRemoveKeyword = (keywordId) => {
    const tempKeywords = keywordsList?.filter(
      (keyword) => keyword.id !== keywordId
    );
    setKeywordsList(tempKeywords);
  };

  const handleTextEditorChange = (event) => {
    const data = event.editor.getData();
    setEditorData(data);
  };

  const handleSaveDraft = () => {
    const requestBody = {
      newsletter: {
        reference: formData.title,
        emailSubject: formData.subject,
        body: editorData,
        keywords: keywordsList,
      },
    };

    console.log("RB:: File: new.js, Line: 51 ==> requestBody", requestBody);
  };

  const handlePublishSend = () => {
    const requestBody = {
      newsletter: {
        reference: formData.title,
        emailSubject: formData.subject,
        body: editorData,
        keywords: keywordsList.map((keyword) => keyword.text),
      },
    };

    console.log("RB:: File: new.js, Line: 51 ==> requestBody", requestBody);
  };

  return (
    <Flex flexDirection="column" w="100%">
      <Flex
        justifyContent="space-between"
        flexDir={["column", "row"]}
        width="100%"
      >
        <Flex mb={5}>
          <Heading>Create Newsletter</Heading>
        </Flex>
        <Flex>
          <Button
            rounded={"full"}
            text="Save as Draft"
            variant="outline"
            fontWeight={400}
            backgroundColor="bright.fg"
            color="bright.bg"
            onClick={handleSaveDraft}
          />
          <Button
            rounded={"full"}
            text="Publish & Send"
            variant="outline"
            fontWeight={400}
            ml={5}
            backgroundColor="bright.fg"
            color="bright.bg"
            onClick={handlePublishSend}
          />
        </Flex>
      </Flex>
      <Flex w="100%" flexDir={["column", "row"]} mt={[5, 0, 0, 0, 0]}>
        <FormControl p={2}>
          <FormLabel>Newsletter Title (Invisible to Audience)</FormLabel>
          <Input
            type="text"
            name="title"
            focusBorderColor="bright.fg"
            borderColor="bright.light"
            border="1px solid"
            borderRadius={0}
            value={formData.title}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl p={2}>
          <FormLabel>Emailer Subject Line</FormLabel>
          <Input
            type="text"
            name="subject"
            focusBorderColor="bright.fg"
            borderColor="bright.light"
            border="1px solid"
            borderRadius={0}
            value={formData.subject}
            onChange={handleInputChange}
          />
        </FormControl>
      </Flex>
      <Flex flexDir="column" width={["100%", "50%"]}>
        <FormControl p={2}>
          <FormLabel>Keywords</FormLabel>
          <Flex>
            <Input
              type="text"
              name="keyword"
              focusBorderColor="bright.fg"
              borderColor="bright.light"
              border="1px solid"
              borderRadius={0}
              value={formData.keyword}
              onChange={handleInputChange}
            />
            <IconButton
              aria-label="Add Keyword"
              icon={<FiPlus />}
              ml={2}
              fontSize="2xl"
              borderRadius={0}
              backgroundColor="bright.fg"
              color="bright.bg"
              _focus={{ boxShadow: "none" }}
              onClick={handleAddKeyword}
            />
          </Flex>
        </FormControl>
        <Flex p={2} flexWrap="wrap">
          {keywordsList.length > 0 &&
            keywordsList.map((keyword) => (
              <Badge
                display="flex"
                justifyContent="center"
                alignItems="center"
                variant="subtle"
                colorScheme="teal"
                key={keyword.id}
                fontSize="0.8em"
                backgroundColor="bright.fg"
                color="bright.bg"
                mr={2}
                mt={[2]}
              >
                <Text pl={1}>{keyword.text}</Text>
                <CloseButton
                  size="sm"
                  borderRadius={0}
                  onClick={() => handleRemoveKeyword(keyword.id)}
                  backgroundColor="bright.fg"
                  color="bright.bg"
                />
              </Badge>
            ))}
        </Flex>
      </Flex>
      <Flex flexDirection="row" justifyContent="center" width="100%">
        <Flex flexDirection="column" w="100%" p={2}>
          <Text fontWeight="bold" fontSize="lg" mb={3}>
            Newsletter Body
          </Text>
          <RichTextEditor
            handleChange={(e) => handleTextEditorChange(e)}
            data={editorData}
          />
        </Flex>
        <Flex flexDirection="column" width="100%" p={2}>
          <Text fontWeight="bold" fontSize="lg" mb={3}>
            Preview
          </Text>
          <Box
            p={10}
            border="1px"
            borderColor="gray.200"
            bgImage="url(/preview-bg-white.jpg)"
            bgPosition="center"
            bgRepeat="repeat"
            bgSize="cover"
          >
            {renderHTML(editorData)}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default CreateNewNewsletter;
