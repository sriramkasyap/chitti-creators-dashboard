import React from "react";
import {
  Flex,
  Box,
  Input,
  Text,
  Divider,
  IconButton,
  Image,
} from "@chakra-ui/react";
import Button from "../common/Button/Button";

import { FiPlus } from "react-icons/fi";

const CreatorPlan = ({
  plan,
  handlePlanUpdate,
  handlePlanSave,
  pageStatus,
}) => {
  const handleFeatureAdd = () => {
    // Add a blank feature field to the plan
    plan.planFeatures.push("");
    handlePlanUpdate(plan);
  };

  const handleFeatureUpdate = (e) => {
    // Handle change in feature fields
    plan.planFeatures[e.target.name] = e.target.value;
    handlePlanUpdate(plan);
  };

  const handlePriceUpdate = (e) => {
    // Update Plan pricing
    plan.planFee = parseFloat(e.target.value);
    handlePlanUpdate(plan);
  };

  return (
    <Flex
      w="100%"
      maxW={["100%", "100%", "400px", "450px", "500px"]}
      flexDir="column"
      justifyContent="center"
      alignItems="stretch"
      mt={5}
      mr={[0, 5, 5, 10, 20]}
      mb={5}
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
        <Text textAlign="center" mb={5} fontSize={25} fontWeight="semibold">
          {plan.planFee === 0 ? "Free Plan" : "Paid Plan"}
        </Text>
        <Flex
          justifyContent="center"
          ml={-6}
          flexWrap="nowrap"
          alignItems="center"
        >
          <Text fontSize={40} mr={2} fontFamily="sans-serif">
            ₹
          </Text>
          <Input
            placeholder="0"
            display="block"
            w="125px"
            fontSize={40}
            isReadOnly={plan.planFee === 0}
            borderColor="bright.light"
            focusBorderColor="bright.light"
            borderRadius={0}
            textAlign="center"
            p={15}
            h={20}
            value={plan.planFee}
            fontWeight="bold"
            onChange={handlePriceUpdate}
          />
        </Flex>
        <Text mt={2} fontWeight="light">
          Pricing (per month)
        </Text>
        <Divider
          w="60%"
          mt={5}
          mb={5}
          borderTop="1px solid"
          borderBottom="0"
          borderColor="bright.light"
        />
        <Text fontWeight="semibold">Features</Text>
        <Flex w="100%" mt={2} flexDir="column" alignItems="center">
          {plan.planFeatures.length > 0 ? (
            plan.planFeatures.map((feature, f) => (
              <Flex w="100%" alignItems="flex-end" key={f}>
                <Text mr={4} mb={2} fontSize={[20]} lineHeight={1}>
                  {f + 1}.
                </Text>
                <Input
                  variant="flushed"
                  textAlign="center"
                  focusBorderColor="bright.fg"
                  borderColor="bright.light"
                  mt={1}
                  mb={1}
                  fontSize={16}
                  placeholder="Add your plan features here"
                  value={feature}
                  onChange={handleFeatureUpdate}
                  name={f}
                />
              </Flex>
            ))
          ) : (
            <Text
              color={"bright.gray"}
              fontWeight="light"
              fontSize={14}
              fontStyle="italic"
              my={2}
            >
              Add the features you offer in this plan
            </Text>
          )}
          <IconButton
            aria-label="Add Plan Feature"
            icon={<FiPlus />}
            ml={2}
            fontSize="2xl"
            borderRadius={0}
            backgroundColor="bright.light"
            color="bright.fg"
            _focus={{ boxShadow: "none" }}
            mt={2}
            onClick={handleFeatureAdd}
          />
        </Flex>

        <Button
          rounded={"full"}
          text={
            pageStatus === "savingPlan" ? (
              <Image src="/loader_white.gif" h="2rem" />
            ) : (
              "Save Plan"
            )
          }
          variant="solid"
          size="md"
          mt={10}
          color="bright.bg"
          backgroundColor="bright.fg"
          border="1px solid"
          borderColor="bright.fg"
          _hover={{
            backgroundColor: "bright.bg",
            color: "bright.fg",
          }}
          p="1rem 2rem"
          fontWeight="normal"
          onClick={() => handlePlanSave(plan._id)}
          disabled={pageStatus !== "loaded"}
        />
      </Box>
    </Flex>
  );
};

export default CreatorPlan;
