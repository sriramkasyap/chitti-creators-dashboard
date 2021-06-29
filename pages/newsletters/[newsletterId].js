import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import renderHTML from "react-render-html";
import { withIronSession } from "next-iron-session";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  IconButton,
  Box,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

import ErrorAlert from "../../src/components/common/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../src/components/common/SuccessAlert/SuccessAlert";
import Button from "../../src/components/common/Button/Button";

const RichTextEditor = dynamic(
  () => import("../../src/components/common/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

import { checkAuthentication, getIronConfig } from "../../src/utils";
import juice from "juice";
import ckeditorStyles from "../../src/components/common/ckeditorStyles";
import {
  getPlan,
  publishNewsletter,
  updateNewsletter,
} from "../../src/helpers/userFetcher";
import Newsletter from "../../src/models/Newsletter";
import { isValidObjectId } from "mongoose";
import PublishModal from "../../src/components/common/PublishModal/PublishModal";

const EditNewsletter = ({ newsletter }) => {
  const [editorData, setEditorData] = useState(newsletter.body);
  const [formData, setFormData] = useState({
    reference: newsletter.reference,
    subject: newsletter.emailSubject,
    keyword: "",
  });
  const [selectedPlan, selectPlan] = useState();
  const [recipientCount, setRecipientCount] = useState();
  const [keywordsList, setKeywordsList] = useState(newsletter.keywords);
  const [pageStatus, setPageStatus] = useState("loaded");
  // enum for Page status. Values as below
  // loaded, saving, publishing
  const [errorMessage, setError] = useState();
  const [successMessage, setSuccess] = useState();
  const publishModalDisclosure = useDisclosure({
    defaultIsOpen: false,
    id: "publishModal",
  });

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

  const handleRemoveKeyword = (kIndex) => {
    const tempKeywords = keywordsList?.filter(
      (keyword, index) => index !== kIndex
    );
    setKeywordsList(tempKeywords);
  };

  const handleTextEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(juice.inlineContent(data, ckeditorStyles));
  };

  const handleSaveDraft = () => {
    setPageStatus("saving");
    if (valdateFormData()) {
      const requestBody = {
        reference: formData.reference,
        emailSubject: formData.subject,
        body: editorData,
        keywords: keywordsList,
      };

      updateNewsletter(newsletter.newsletterId, requestBody)
        .then((result) => {
          if (result.success) {
            setEditorData(result.newsletter.body);
            setFormData({
              reference: result.newsletter.reference,
              subject: result.newsletter.emailSubject,
              keyword: "",
            });
            setKeywordsList(result.newsletter.keywords);
            setPageStatus("loaded");
            setSuccess("Newsletter Saved Successfully!");
          } else {
            setError(result.message);
            setPageStatus("loaded");
          }
        })
        .catch((e) => {
          setError(e.message);
          setPageStatus("loaded");
        });
    } else {
      setPageStatus("loaded");
    }
  };

  const handlePublishSend = async () => {
    setPageStatus("publishing");
    handleSaveDraft();
    publishModalDisclosure.onOpen();
  };

  const valdateFormData = () => {
    setError("");
    if (
      formData &&
      formData.reference &&
      formData.subject &&
      formData.reference.length > 0 &&
      formData.subject.length > 0 &&
      keywordsList &&
      keywordsList.length > 0 &&
      editorData.length > 0
    ) {
      return true;
    } else {
      setError("Please Enter all the details");
      return false;
    }
  };

  const handlePublishNewsletter = () => {
    setPageStatus("publishing");
    publishNewsletter(newsletter.newsletterId, selectedPlan)
      .then((result) => {
        if (result.success) {
          setEditorData(result.newsletter.body);
          setFormData({
            reference: result.newsletter.reference,
            subject: result.newsletter.emailSubject,
            keyword: "",
          });
          setKeywordsList(result.newsletter.keywords);
          setSuccess("Newsletter has been sent Successfully");
          setPageStatus("loaded");
          publishModalDisclosure.onClose();
        } else {
          setError(result.message);
          setPageStatus("loaded");
          publishModalDisclosure.onClose();
        }
      })
      .catch((e) => {
        setError(e.message);
        setPageStatus("loaded");
        publishModalDisclosure.onClose();
      });
  };

  useEffect(() => {
    // Refresh recipientCount every time the plan is selected
    if (selectedPlan && selectedPlan.length > 0) {
      getPlan(selectedPlan)
        .then((result) => {
          if (result.success) {
            setRecipientCount(result.plan.subscribers.length);
          } else {
            publishModalDisclosure.onClose();
            setError(result.message);
          }
        })
        .catch((e) => {
          publishModalDisclosure.onClose();
          setError(e.message);
        });
    }
  }, [selectedPlan]);

  return (
    <Flex flexDirection="column" w="100%" mt={["8vh", "8vh", "8vh", "10vh", 0]}>
      <PublishModal
        disclosure={publishModalDisclosure}
        selectedPlan={selectedPlan}
        selectPlan={selectPlan}
        recipientCount={recipientCount}
        publishNewsletter={handlePublishNewsletter}
        pageStatus={pageStatus}
      />
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
          <Heading fontSize={["3xl", "3xl", "3xl", "4xl", "4xl"]}>
            Edit Newsletter
          </Heading>
        </Flex>
        <Flex
          flexDirection={"row"}
          justifyContent={["flex-start", "flex-start", "flex-end"]}
        >
          <Button
            rounded={"full"}
            disabled={pageStatus !== "loaded"}
            text={
              pageStatus === "saving" ? (
                <Image src="/loader_black.gif" h="2rem" />
              ) : (
                "Save Draft"
              )
            }
            variant="outline"
            fontWeight={400}
            bg="bright.light"
            _hover={{
              bg: "transparent",
              color: "bright.fg",
              borderColor: "bright.fg",
            }}
            borderColor="bright.light"
            color="bright.fg"
            onClick={handleSaveDraft}
            fontSize={[12, 14, 16]}
            p="1rem 2rem"
          />
          <Button
            rounded={"full"}
            disabled={pageStatus !== "loaded"}
            text={
              pageStatus === "publishing" ? (
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
              bg: "transparent",
              color: "bright.fg",
              borderColor: "bright.fg",
            }}
            color="bright.bg"
            onClick={handlePublishSend}
            fontSize={[12, 14, 16]}
            p="1rem 2rem"
          />
        </Flex>
      </Flex>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
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
          <FormLabel>Tags</FormLabel>
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
            keywordsList.map((keyword, index) => (
              <Tag
                size="md"
                key={index + 1}
                borderRadius={0}
                variant="solid"
                backgroundColor="bright.fg"
                color="bright.bg"
                textTransform="uppercase"
                mr={2}
                mt={2}
              >
                <TagLabel>{keyword}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveKeyword(index)} />
              </Tag>
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
          mt={[2, 2, 2, 2, 0]}
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

export const getServerSideProps = withIronSession(async (ctx) => {
  var { props } = await checkAuthentication(ctx);

  var { req, res } = ctx;

  var { newsletterId } = ctx.query;

  if (!isValidObjectId(newsletterId)) {
    res.statusCode = 404;
    return res.end();
  }

  var newsletter = await Newsletter.findById(newsletterId).lean();
  var creator = req.session.get("creator");

  if (!newsletter.creator.equals(creator.creatorId)) {
    res.statusCode = 401;
    return res.end();
  }

  if (newsletter && newsletter._id) {
    var newsletterId = newsletter._id.toString();
    delete newsletter._id;
    newsletter.createdAt = newsletter.createdAt.toString();
    newsletter.lastSavedAt = newsletter.lastSavedAt.toString();
    newsletter.sentAt = newsletter.sentAt ? newsletter.sentAt.toString() : null;
    newsletter.creator = newsletter.creator.toString();
    newsletter.recipients = newsletter.recipients.length;
    return {
      props: {
        ...props,
        newsletter: {
          ...newsletter,
          newsletterId,
        },
      },
    };
  } else {
    res.statusCode = 404;
    return res.end();
  }
}, getIronConfig());

export default EditNewsletter;
