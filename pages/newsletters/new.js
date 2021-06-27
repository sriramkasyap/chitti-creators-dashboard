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
  Image,
} from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import renderHTML from "react-render-html";
import Button from "../../src/components/common/Button/Button";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const RichTextEditor = dynamic(
  () => import("../../src/components/common/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

import { checkAuthentication, getIronConfig } from "../../src/utils";
import juice from "juice";
import ckeditorStyles from "../../src/components/common/ckeditorStyles";
import { createNewsletter } from "../../src/helpers/userFetcher";

const CreateNewNewsletter = () => {
  const [editorData, setEditorData] = useState(
    `<p style="text-align:center;">&nbsp;</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><span class="text-huge" style="font-size: 1.8em; color: hsl(270, 75%, 60%);">Hello World!</span></p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><span style="color:hsl(270, 75%, 60%);">Welcome to the First newsletter ever written on <strong>Chitti</strong></span></p><p style="text-align:center;">&nbsp;</p><p style="text-align:center;"><span style="color:hsl(270, 75%, 60%);">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</span></p><p style="text-align:center;"><br>&nbsp;</p>`
  );
  const [formData, setFormData] = useState({
    reference: "",
    subject: "",
    keyword: "",
  });
  const [keywordsList, setKeywordsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isPublishing, setPublishing] = useState(false);
  const [isSavingDraft, setSavingDraft] = useState(false);

  const router = useRouter();

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
    setKeywordsList([...keywordsList, formData.keyword]);
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

  const handleTextEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(juice.inlineContent(data, ckeditorStyles));
  };

  const handleSaveDraft = () => {
    setLoading(true);
    setSavingDraft(true);
    const requestBody = {
      reference: formData.reference,
      emailSubject: formData.subject,
      body: editorData,
      keywords: keywordsList,
    };

    createNewsletter(requestBody)
      .then((result) => {
        if (result.success) {
          router.push(`/newsletters/${result.newsletter._id}`);
        } else {
          alert(result.message); // TODO: Show Error message
        }
      })
      .catch((e) => {
        alert(e.message); // TODO: Show Error message
      });
    console.log("RB:: File: new.js, Line: 85 ==> requestBody", requestBody);
  };

  const handlePublishSend = () => {
    setLoading(true);
    setPublishing(true);
    const requestBody = {
      newsletter: {
        reference: formData.reference,
        emailSubject: formData.subject,
        body: editorData,
        keywords: keywordsList.map((keyword) => keyword.text),
      },
    };

    console.log("RB:: File: new.js, Line: 98 ==> requestBody", requestBody);
  };

  return (
    <Flex flexDirection="column" w="100%">
      <Flex
        justifyContent="space-between"
        flexDir={["column", "column", "row"]}
        alignItems={"center"}
        width="100%"
        pl={[0, 0, 0, 0, 5]}
        pr={[0, 0, 0, 0, 5]}
        pt={[0, 0, 0, 0, 5]}
      >
        <Flex mb={[5, 5, 5, 0, 0]} mt={[5, 5, 5, 0, 0]} ml={[0, 0, 0, 0]}>
          <Heading>Create Newsletter</Heading>
        </Flex>
        <Flex
          flexDirection={"row"}
          justifyContent={["flex-start", "flex-start", "flex-end"]}
        >
          <Button
            rounded={"full"}
            disabled={isSavingDraft}
            text={
              isSavingDraft ? (
                <Image src="/loader_black.gif" h="2rem" />
              ) : (
                "Save Draft"
              )
            }
            variant="outline"
            fontWeight={400}
            backgroundColor="transparent"
            _hover={{
              bg: "bright.gray",
              color: "bright.bg",
            }}
            color="bright.fg"
            onClick={handleSaveDraft}
            fontSize={[12, 14, 16]}
            p="1rem 2rem"
          />
          {/* <Button
            rounded={"full"}
            disabled={isLoading}
            text={
              isPublishing ? (
                <Image src="/loader_white.gif" h="2rem" />
              ) : (
                "Publish & Send"
              )
            }
            variant="outline"
            fontWeight={400}
            ml={[2, 2, 2, 5]}
            backgroundColor="bright.fg"
            _hover={{
              bg: "bright.gray",
              color: "bright.bg",
            }}
            color="bright.bg"
            onClick={handlePublishSend}
            fontSize={[12, 14, 16]}
            p="1rem 2rem"
          /> */}
        </Flex>
      </Flex>
      <Flex w="100%" flexWrap={"wrap"} mt={[5, 5, 7, 10, 10]}>
        <FormControl
          flex={["100%", "100%", "50%"]}
          pl={[0, 0, 0, 0, 5]}
          pt={2}
          pb={[2, 2, 2, 2, 5]}
          pr={[0, 0, 5, 5, 10]}
        >
          <FormLabel>Newsletter Name (Invisible to Audience)</FormLabel>
          <Input
            type="text"
            name="reference"
            focusBorderColor="bright.fg"
            borderColor="bright.light"
            border="1px solid"
            borderRadius={0}
            value={formData.reference}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl
          pl={[0, 0, 5, 5]}
          pt={2}
          pb={[2, 2, 2, 2, 5]}
          pr={[0, 0, 0, 0, 5]}
          flex={["100%", "100%", "50%"]}
        >
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
      <Flex alignItems="center" flexWrap="wrap" width={"100%"}>
        <FormControl
          pl={[0, 0, 0, 0, 5]}
          pt={2}
          pb={[2, 2, 2, 2, 5]}
          pr={[0, 0, 5, 5, 10]}
          width={["100%", "100%", "50%"]}
        >
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
        <Flex
          pl={[0, 0, 5, 5, 5]}
          pt={2}
          pb={[2, 2, 2, 2, 5]}
          pr={[0, 0, 0, 0, 5]}
          flexWrap="wrap"
          width={["100%", "100%", "50%"]}
        >
          <Box width="100%" height="20px"></Box>
          {keywordsList.length > 0 &&
            keywordsList.map((keyword, k) => (
              <Badge
                display="flex"
                justifyContent="center"
                alignItems="center"
                variant="subtle"
                colorScheme="teal"
                key={k}
                fontSize="0.8em"
                backgroundColor="bright.fg"
                color="bright.bg"
                mr={2}
                mt={[2]}
              >
                <Text pl={1}>{keyword}</Text>
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
      <Flex
        flexDirection="row"
        justifyContent="center"
        flexWrap={"wrap"}
        width="100%"
      >
        <Flex
          flexDirection="column"
          w={["100%", "100%", "100%", "50%"]}
          pl={[0, 0, 0, 0, 5]}
          pt={2}
          pb={2}
          pr={[0, 0, 0, 5, 10]}
        >
          <Text fontWeight="bold" fontSize="lg" mb={3}>
            Newsletter Body
          </Text>
          <RichTextEditor
            handleChange={handleTextEditorChange}
            data={editorData}
          />
        </Flex>
        <Flex
          flexDirection="column"
          width={["100%", "100%", "100%", "50%"]}
          pl={[0, 0, 0, 5, 5]}
          pt={2}
          pb={2}
          pr={[0, 0, 0, 0, 5]}
          mt={2}
        >
          <Text fontWeight="bold" fontSize="lg" mb={3}>
            Preview
          </Text>
          <Box
            p={5}
            border="1px"
            borderColor="gray.200"
            bgImage="url(/preview-bg-white.jpg)"
            bgPosition="center"
            bgRepeat="repeat"
            bgSize="cover"
            height="100%"
            minHeight="400px"
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
