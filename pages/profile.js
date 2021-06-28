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
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";

import { AuthContext } from "../contexts/AuthContext";
import {
  checkAuthentication,
  getIronConfig,
  ucFirst,
  validateURL,
} from "../src/utils";
import { addPlan, updatePlan, updateProfile } from "../src/helpers/userFetcher";

const Profile = () => {
  const [profile, setProfile] = useState({}); // Profile Content of the creator
  const [plans, setPlans] = useState([]); // Plans content of the creator
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const { fetchMe, loggedInUser, loginError } = useContext(AuthContext); // Loading user data from the Authentication Context

  useEffect(() => {
    // Refresh creator profile on first load
    fetchMe().then((fetchSuccessful) => {
      if (fetchSuccessful) {
        setProfile(loggedInUser.profile);
        setPlans(loggedInUser.plans);
        setLoading(false);
      } else {
        setError(loginError);
        setLoading(false);
      }
    });
  }, []);

  const handleUpdateProfile = () => {
    // Handle Save profile action
    setLoading(true);
    if (validateProfile()) {
      updateProfile(profile)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Profile Saved successfully");
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const addPlan = (planIdToEdit) => {
    // Handle create new Plan
    setLoading(true);
    var plan = plans.filter(planId === planIdToEdit)[0];
    if (validatePlan(plan)) {
      addPlan(plan)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Plan added successfully");
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const updatePlan = (planIdToEdit) => {
    // Handle Save plan
    setLoading(true);
    var plan = plans.filter(planId === planIdToEdit)[0];
    if (validatePlan(plan)) {
      updatePlan(planIdToEdit, plan)
        .then((result) => {
          if (result.success) {
            setSuccessMessage("Plan added successfully");
            setLoading(false);
          } else {
            setError(result.message);
            setLoading(false);
          }
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
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
      if (validateURL(displayPicture)) {
        return true;
      } else {
        setError("Invalid Display picture url");
        return false;
      }
    } else {
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

  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%">
        <Flex w="100%" flexDir="column">
          <FormControl>
            <FormLabel>Display Name</FormLabel>
            <Input />
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Newsletter Name</FormLabel>
            <Input />
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Short Bio</FormLabel>
            <Input />
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Full Bio</FormLabel>
            <FormErrorMessage>Error message</FormErrorMessage>
            <Textarea />
          </FormControl>
        </Flex>
        <Flex w="30%" flexDir="column" ml={5}>
          <Flex w="100%" justifyContent="center">
            <Button
              rounded={"full"}
              text="Save"
              variant="solid"
              backgroundColor="bright.fg"
              size="lg"
            />
          </Flex>
          <Flex
            w="100%"
            justifyContent="center"
            mt={5}
            flexDir="column"
            alignItems="center"
          >
            <Image
              height="100px"
              w="100px"
              borderRadius="50%"
              src="media.png"
            />
            <Link textAlign="center" mt={3} textDecor="underline">
              Update Profile Picture
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Divider
        mt={5}
        mb={5}
        border="1px solid"
        borderColor="bright.light"
        backgroundColor="bright.light"
      />
      <Flex flexDir="column">
        <Flex w="100%">
          <Heading>Subscriptions</Heading>
        </Flex>
        <Flex
          mt={5}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Flex
            w="90%"
            flexDir="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Text mb={2}>Free Plan</Text>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid"
              borderRadius={5}
              p={5}
            >
              <Input
                placeholder="$0"
                display="block"
                w="20%"
                isReadOnly
                borderColor="bright.light"
                focusBorderColor="bright.light"
              />
              <Text mt={3}>Pricing</Text>
              <Divider
                w="60%"
                mt={2}
                mb={5}
                border="1px solid"
                borderColor="bright.gray"
                backgroundColor="bright.gray"
              />
              <Text>Features</Text>
              <Flex w="100%" mt={3}>
                <Input />
                <Button
                  text="+"
                  variant="solid"
                  size="md"
                  ml={3}
                  backgroundColor="bright.fg"
                />
              </Flex>
              <Flex mt={3} w="100%" flexDir="column">
                <Text>Text Value One</Text>
                <Text mt={2}>Text Value Two</Text>
                <Text mt={2}>Text Value Three</Text>
              </Flex>
              <Button
                text="Save"
                variant="solid"
                size="md"
                mt={5}
                backgroundColor="bright.fg"
              />
            </Box>
          </Flex>
          <Flex w="90%" ml={5} flexDir="column">
            <Text mb={2}>Paid Plan</Text>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid"
              borderRadius={5}
              p={5}
            >
              <Input
                placeholder="$5"
                display="block"
                w="20%"
                focusBorderColor="bright.fg"
              />
              <Text mt={3}>Pricing</Text>
              <Divider
                w="60%"
                mt={2}
                mb={5}
                border="1px solid"
                borderColor="bright.gray"
                backgroundColor="bright.gray"
              />
              <Text>Features</Text>
              <Flex w="100%" mt={3}>
                <Input />
                <Button
                  text="+"
                  variant="solid"
                  size="md"
                  ml={3}
                  backgroundColor="bright.fg"
                />
              </Flex>
              <Flex mt={3} w="100%" flexDir="column">
                <Text>Text Value One</Text>
                <Text mt={2}>Text Value Two</Text>
                <Text mt={2}>Text Value Three</Text>
              </Flex>
              <Button
                text="save"
                variant="solid"
                size="md"
                mt={5}
                backgroundColor="bright.fg"
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
