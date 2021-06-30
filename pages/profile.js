import { useContext, useEffect, useState } from "react";
import { withIronSession } from "next-iron-session";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Image,
  Link,
  Divider,
  Heading,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";

import { FiPlus } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import {
  checkAuthentication,
  getIronConfig,
  ucFirst,
  validateURL,
} from "../src/utils";
import { addPlan, updatePlan, updateProfile } from "../src/helpers/userFetcher";
import ErrorAlert from "../src/components/common/ErrorAlert/ErrorAlert";
import SuccessAlert from "../src/components/common/SuccessAlert/SuccessAlert";

const Profile = () => {
  const { fetchMe, loggedInUser, loginError } = useContext(AuthContext); // Loading user data from the Authentication Context

  const [profile, setProfile] = useState(loggedInUser.profile); // Profile Content of the creator
  const [plans, setPlans] = useState([]); // Plans content of the creator
  const [pageStatus, setStatus] = useState("loading"); // Page Status
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  useEffect(() => {
    // Refresh creator profile if the value in provider changes
    setProfile(loggedInUser.profile);
    setPlans(loggedInUser.plans);
    setStatus("loaded");
  }, [loggedInUser]);

  const handleUpdateProfile = () => {
    // Handle Save profile action
    setStatus("loading");
    setSuccessMessage("");
    if (validateProfile()) {
      updateProfile(profile)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Profile Saved successfully");
            setStatus("loaded");
            setProfile(result.creator.profile);
            fetchMe();
          } else {
            setError(result.message);
            setStatus("loaded");
          }
        })
        .catch((e) => {
          setError(e.message);
          setStatus("loaded");
        });
    } else {
      setStatus("loaded");
    }
  };

  const addPlan = (planIdToEdit) => {
    // Handle create new Plan
    setStatus("loading");
    var plan = plans.filter(planId === planIdToEdit)[0];
    if (validatePlan(plan)) {
      addPlan(plan)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Plan added successfully");
            setStatus("loaded");
          } else {
            setError(result.message);
            setStatus("loaded");
          }
        })
        .catch((e) => {
          setError(e.message);
          setStatus("loaded");
        });
    } else {
      setStatus("loaded");
    }
  };

  const updatePlan = (planIdToEdit) => {
    // Handle Save plan
    setStatus("loading");
    var plan = plans.filter(planId === planIdToEdit)[0];
    if (validatePlan(plan)) {
      updatePlan(planIdToEdit, plan)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Plan added successfully");
            setStatus("loaded");
          } else {
            setError(result.message);
            setStatus("loaded");
          }
        })
        .catch((e) => {
          setError(e.message);
          setStatus("loaded");
        });
    } else {
      setStatus("loaded");
    }
  };

  const validateProfile = () => {
    setError("");
    var { fullName, shortBio, longBio, displayPicture } = profile;

    if (
      fullName &&
      shortBio &&
      longBio &&
      displayPicture &&
      fullName.length > 0 &&
      shortBio.length > 0 &&
      longBio.length > 0 &&
      displayPicture.length > 0
    ) {
      // if (validateURL(displayPicture)) {
      return true;
      // } else {
      //   console.log(displayPicture);
      //   setError("Invalid Display picture url");
      //   return false;
      // }
    } else {
      console.log(
        fullName,
        shortBio,
        longBio,
        displayPicture,
        fullName.length > 0,
        shortBio.length > 0,
        longBio.length > 0,
        displayPicture.length > 0
      );
      setError("Please fill all the details");
      return false;
    }
  };

  const validatePlan = (plan) => {
    setError("");
    var { planFee, planFeatures } = plan;

    if (
      planFee !== null &&
      planFee !== undefined &&
      planFeatures &&
      planFeatures.length > 0
    ) {
      var flag = true;
      planFeatures.some((feature) => {
        if (!feature || !feature.length > 0) {
          flag = false;
          return false;
        }
      });
      return flag;
    } else {
      setError("Please add features for the plan");
      return false;
    }
  };

  const handleProfileInput = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Flex
      flexDir="column"
      w="100%"
      maxW={["100%", "100%", "100%", "100%", "1440px"]}
      ml={[0]}
    >
      <Flex w="100%" flexDir={["column-reverse", "column-reverse", "row"]}>
        <Flex w="100%" flexDir="column" mt={[5, 0]}>
          <Flex
            flexWrap="wrap"
            flexDir={["column", "column", "row"]}
            justifyContent="space-between"
          >
            <FormControl
              flex={["100%", "100%", "100%", "46%"]}
              maxW={["100%", "100%", "100%", "46%"]}
              ml={[0, 0, 3, 5, 8]}
              mt={[3, 3, 3, 5]}
            >
              <FormLabel>Display Name</FormLabel>
              <Input
                borderRadius={0}
                focusBorderColor="bright.fg"
                borderColor="bright.light"
                value={profile.fullName || ""}
                onChange={handleProfileInput}
                name="fullName"
              />
            </FormControl>
            <FormControl
              flex={["100%", "100%", "100%", "46%"]}
              maxW={["100%", "100%", "100%", "46%"]}
              ml={[0, 0, 3, 5]}
              mt={[3, 3, 3, 5]}
            >
              <FormLabel>Short Bio</FormLabel>
              <Input
                borderRadius={0}
                focusBorderColor="bright.fg"
                borderColor="bright.light"
                value={profile.shortBio || ""}
                onChange={handleProfileInput}
                name="shortBio"
              />
            </FormControl>
          </Flex>
          <Flex mt={[3, 3, 3, 5]} ml={[0, 0, 3, 5, 8]}>
            <FormControl>
              <FormLabel>Full Bio</FormLabel>
              <Textarea
                borderRadius={0}
                focusBorderColor="bright.fg"
                borderColor="bright.light"
                value={profile.longBio || ""}
                onChange={handleProfileInput}
                name="longBio"
                size="lg"
                minH="300px"
              />
            </FormControl>
          </Flex>
        </Flex>
        <Flex
          w={["100%", "100%", "50%"]}
          flexDir="column"
          ml={[0, 0, 2]}
          mb={[1, 4]}
        >
          <Flex
            w="100%"
            justifyContent={["flex-start", "flex-start", "center"]}
            mt={5}
            flexDir="column"
            alignItems={["flex-start", "flex-start", "center"]}
          >
            <Image
              height={["100px", "100px", "100px", "150px"]}
              w={["100px", "100px", "100px", "150px"]}
              borderRadius="50%"
              src={profile.displayPicture || "/media.png"}
            />
            <Link textAlign="center" mt={5} textDecor="underline">
              Upload Profile Picture
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex alignItems="center" mt={5} ml={[0, 0, 3, 5, 8]}>
        <Button
          rounded={"full"}
          disabled={pageStatus !== "loaded"}
          text={
            pageStatus === "loaded" ? (
              "Save Profile"
            ) : (
              <Image src="/loader_black.gif" h="2rem" />
            )
          }
          variant="solid"
          backgroundColor="bright.fg"
          size="lg"
          fontWeight="normal"
          onClick={handleUpdateProfile}
          mr={10}
          my={4}
          flex="200px"
          maxW="200px"
          border="1px solid"
          borderColor="bright.fg"
          _hover={{
            backgroundColor: "transparent",
            color: "bright.fg",
          }}
        />
        {successMessage && <SuccessAlert message={successMessage} />}
        {error && <ErrorAlert message={error} />}
      </Flex>
      <Divider
        mt={10}
        mb={10}
        border="1px solid"
        backgroundColor="bright.gray"
      />
      <Flex flexDir="column" mt={6} ml={[0, 0, 3, 5, 8]}>
        <Flex w="100%">
          <Heading>Subscriptions</Heading>
        </Flex>
        <Flex flexDir={["column", "row"]} mt={5} alignItems="center" w="100%">
          <Flex
            w="100%"
            maxW={["100%", "100%", "400px", "450px"]}
            flexDir="column"
            justifyContent="center"
            alignItems="stretch"
            mt={5}
            mr={[5, 5, 5, 10]}
            mb={5}
            ml={0}
          >
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid"
              borderColor="bright.gray"
              borderRadius={5}
              p={5}
            >
              <Text
                textAlign="center"
                mb={5}
                fontSize={25}
                fontWeight="semibold"
              >
                Free Plan
              </Text>
              <Input
                placeholder="0"
                display="block"
                w="20%"
                fontSize={40}
                isReadOnly
                borderColor="bright.light"
                focusBorderColor="bright.light"
                borderRadius={0}
                textAlign="center"
                p={15}
                h={20}
              />
              <Text mt={1} fontWeight="light">
                Pricing
              </Text>
              <Divider
                w="60%"
                mt={2}
                mb={5}
                borderTop="1px solid"
                borderBottom="0"
                borderColor="bright.light"
              />
              <Text fontWeight="semibold">Features</Text>
              <Flex w="100%" mt={5} flexDir="column" alignItems="center">
                <Flex w="100%" alignItems="center">
                  <Text mr={4} fontSize={[20]} lineHeight={1}>
                    1.
                  </Text>
                  <Input
                    textAlign="center"
                    borderRadius={0}
                    focusBorderColor="bright.fg"
                    borderColor="bright.light"
                    mt={2}
                    mb={2}
                    fontSize={[16]}
                    placeholder="Add your plan offerings here"
                  />
                </Flex>
                <IconButton
                  aria-label="Add Plan Feature"
                  icon={<FiPlus />}
                  ml={2}
                  fontSize="2xl"
                  borderRadius={0}
                  backgroundColor="bright.light"
                  color="bright.fg"
                  _focus={{ boxShadow: "none" }}
                  mt={5}
                />
              </Flex>
              <Button
                rounded={"full"}
                text="Save Plan"
                variant="solid"
                size="md"
                mt={50}
                backgroundColor="bright.fg"
                p="1rem 2rem"
                fontWeight="normal"
              />
            </Box>
          </Flex>
          <Flex
            w="100%"
            maxW={["100%", "100%", "400px", "450px"]}
            flexDir="column"
            justifyContent="center"
            alignItems="stretch"
            mt={5}
            mr={[5, 5, 5, 10]}
            mb={5}
            ml={0}
          >
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid"
              borderColor="bright.gray"
              borderRadius={5}
              p={5}
            >
              <Text
                textAlign="center"
                mb={5}
                fontSize={25}
                fontWeight="semibold"
              >
                Paid Plan
              </Text>
              <Input
                placeholder="0"
                display="block"
                w="20%"
                fontSize={40}
                isReadOnly
                borderColor="bright.light"
                focusBorderColor="bright.light"
                borderRadius={0}
                textAlign="center"
                p={15}
                h={20}
              />
              <Text mt={1} fontWeight="light">
                Pricing
              </Text>
              <Divider
                w="60%"
                mt={2}
                mb={5}
                borderTop="1px solid"
                borderBottom="0"
                borderColor="bright.light"
              />
              <Text fontWeight="semibold">Features</Text>
              <Flex w="100%" mt={5} flexDir="column" alignItems="center">
                <Flex w="100%" alignItems="center">
                  <Text mr={4} fontSize={[20]} lineHeight={1}>
                    1.
                  </Text>
                  <Input
                    textAlign="center"
                    borderRadius={0}
                    focusBorderColor="bright.fg"
                    borderColor="bright.light"
                    mt={2}
                    mb={2}
                    fontSize={[16]}
                    placeholder="Add your plan offerings here"
                  />
                </Flex>
                <IconButton
                  aria-label="Add Plan Feature"
                  icon={<FiPlus />}
                  ml={2}
                  fontSize="2xl"
                  borderRadius={0}
                  backgroundColor="bright.light"
                  color="bright.fg"
                  _focus={{ boxShadow: "none" }}
                  mt={5}
                />
              </Flex>
              <Button
                rounded={"full"}
                text="Save Plan"
                variant="solid"
                size="md"
                mt={50}
                backgroundColor="bright.fg"
                p="1rem 2rem"
                fontWeight="normal"
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps = withIronSession(
  checkAuthentication,
  getIronConfig()
);

export default Profile;
