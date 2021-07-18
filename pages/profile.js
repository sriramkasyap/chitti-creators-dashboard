import { useContext, useEffect, useRef, useState } from "react";
import { withIronSession } from "next-iron-session";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Divider,
  Heading,
  Box,
} from "@chakra-ui/react";

import Button from "../src/components/common/Button/Button";

import { AuthContext } from "../contexts/AuthContext";
import {
  checkAuthentication,
  getIronConfig,
  showNotification,
} from "../src/utils";
import { addPlan, updatePlan, updateProfile } from "../src/helpers/userFetcher";
import { uploadFile } from "../src/helpers/uploadHelper";
import CreatorPlan from "../src/components/ProfilePage/CreatorPlan";

const Profile = () => {
  const { fetchMe, loggedInUser } = useContext(AuthContext); // Loading user data from the Authentication Context

  const [profile, setProfile] = useState(loggedInUser.profile); // Profile Content of the creator
  const [plans, setPlans] = useState(loggedInUser.plans); // Plans content of the creator
  const [pageStatus, setStatus] = useState("loading"); // Page Status

  const displayPictureRef = useRef();

  useEffect(() => {
    // Refresh creator profile if the value in provider changes
    setProfile(loggedInUser.profile);
    setPlans(loggedInUser.plans);
    setStatus("loaded");
  }, [loggedInUser]);

  const validateProfile = () => {
    const { fullName, shortBio, longBio, displayPicture } = profile;

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
      return true;
    }
    console.log(fullName, shortBio, longBio, displayPicture);
    if (displayPicture) {
      showNotification("Please fill all the details");
    } else {
      showNotification("Please Upload a Display Picture");
    }
    return false;
  };

  const validatePlan = (plan) => {
    const { planFee, planFeatures } = plan;

    if (
      planFee !== null &&
      planFee !== undefined &&
      planFeatures &&
      planFeatures.length > 0
    ) {
      let flag = true;
      planFeatures.some((feature) => {
        if (!feature || !feature.length > 0) {
          flag = false;
          return false;
        }
        return feature;
      });
      if (!flag) showNotification("Plan Feature cannot be empty");
      return flag;
    }
    showNotification("Please add features for the plan");
    return false;
  };

  const handleUpdateProfile = () => {
    // Handle Save profile action
    setStatus("savingProfile");
    if (validateProfile()) {
      updateProfile(profile)
        .then((result) => {
          if (result.success) {
            showNotification("Profile Saved successfully");
            setStatus("loaded");
            setProfile(result.creator.profile);
            fetchMe();
          } else {
            showNotification(result.message);
            setStatus("loaded");
          }
        })
        .catch((e) => {
          showNotification(e.message);
          setStatus("loaded");
        });
    } else {
      setStatus("loaded");
    }
  };

  const handleAddPlan = () => {
    // Handle create new Plan
    setStatus("addingPlan");
    const plan = {
      planFee: 10,
      planFeatures: [],
    };
    addPlan(plan)
      .then((result) => {
        if (result.success) {
          fetchMe();
          setStatus("loaded");
        } else {
          showNotification(result.message);
          setStatus("loaded");
        }
      })
      .catch((e) => {
        showNotification(e.message);
        setStatus("loaded");
      });
  };

  const savePlan = (planIdToEdit) => {
    // Handle Save plan
    setStatus("savingPlan");
    setTimeout(() => {
      const plan = plans.filter(({ _id }) => _id === planIdToEdit)[0];
      if (validatePlan(plan)) {
        updatePlan(planIdToEdit, plan)
          .then((result) => {
            if (result.success) {
              fetchMe();
              showNotification("Plan saved successfully");
              setStatus("loaded");
            } else {
              showNotification(result.message);
              setStatus("loaded");
            }
          })
          .catch((e) => {
            showNotification(e.message);
            setStatus("loaded");
          });
      } else {
        setStatus("loaded");
      }
    }, 2000);
  };

  const handleProfileInput = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleDisplayPictureUpload = () => {
    setStatus("uploading");
    const imageToUpload = displayPictureRef.current.files[0];
    if (imageToUpload.size > 20000000) {
      // File size is greater than 20MB
      showNotification("File Size has to be smaller than 20 MB.");
      setStatus("loaded");
      return;
    }
    uploadFile(imageToUpload)
      .then((result) => {
        if (result.secure_url) {
          setProfile({
            ...profile,
            displayPicture: result.secure_url,
          });
          showNotification(
            "New display picture updated. Hit Save to publish the changes"
          );
        } else {
          console.error(result);
          showNotification("An Error Occured. Please try a different file");
        }
        showNotification(
          "New display picture updated. Hit Save to publish the changes"
        );

        setStatus("loaded");
      })
      .catch((err) => {
        showNotification(err.message);
      });
  };

  const handlePlanUpdate = (newPlan) => {
    // Update plan state on component update

    const newPlans = plans.map((plan) => {
      if (plan._id === newPlan._id) return newPlan;
      return plan;
    });

    if (newPlans.filter(({ planFee }) => planFee === 0).length > 1) {
      showNotification("You cannot create two Free plans");
    } else {
      setPlans(newPlans);
    }
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
            <Box pos="relative">
              <Image
                height={["100px", "100px", "150px", "200px"]}
                w={["100px", "100px", "150px", "200px"]}
                borderRadius="50%"
                zIndex={1}
                src={profile.displayPicture}
                fallbackSrc="/media.png"
                border="5px solid"
                borderColor="bright.light"
              />
              {pageStatus === "uploading" ? (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  top={0}
                  left={0}
                  zIndex={2}
                  pos="absolute"
                  w="100%"
                  h="100%"
                  bgColor="#ffffffcc"
                >
                  <Image src="/loader_black.gif" h="2rem" />
                </Flex>
              ) : (
                <></>
              )}
            </Box>
            <Button
              color="bright.gray"
              textAlign="center"
              mt={5}
              textDecor="underline"
              fontWeight="light"
              text="Change Display Picture"
              onClick={() => displayPictureRef.current.click()}
            />
            <input
              style={{ display: "none" }}
              type="file"
              accept=".jpg, .png, .jpeg"
              name="displayPicture"
              ref={displayPictureRef}
              onChange={handleDisplayPictureUpload}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex alignItems="center" mt={5} ml={[0, 0, 3, 5, 8]}>
        <Button
          rounded="full"
          disabled={pageStatus !== "loaded"}
          text={
            pageStatus === "savingProfile" ? (
              <Image src="/loader_white.gif" h="2rem" />
            ) : (
              "Save Profile"
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
          color="bright.bg"
          _hover={{
            backgroundColor: "transparent",
            color: "bright.fg",
          }}
          _active={{
            backgroundColor: "transparent",
            color: "bright.fg",
          }}
        />
      </Flex>
      <Divider
        mt={10}
        mb={10}
        border="1px solid"
        backgroundColor="bright.gray"
      />
      <Flex flexDir="column" mt={6} ml={[0, 0, 3, 5, 8]}>
        <Flex w="100%" alignItems="center">
          <Heading>Subscription Plans</Heading>
          {plans && plans.length < 2 && (
            <Button
              rounded="full"
              text={
                pageStatus === "addingPlan" ? (
                  <Image src="/loader_black.gif" h="2rem" />
                ) : (
                  "Add New Plan"
                )
              }
              variant="outline"
              size="sm"
              fontWeight="light"
              onClick={handleAddPlan}
              ml={5}
              _hover={{
                backgroundColor: "bright.fg",
                color: "bright.bg",
              }}
            />
          )}
        </Flex>

        <Flex flexDir={["column", "column", "row"]} mt={5} w="100%">
          {plans &&
            plans.length > 0 &&
            plans.map((plan) => (
              <CreatorPlan
                key={plan._id}
                handlePlanUpdate={handlePlanUpdate}
                handlePlanSave={savePlan}
                plan={plan}
                plans={plans}
                setPlans={setPlans}
                pageStatus={pageStatus}
              />
            ))}
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
