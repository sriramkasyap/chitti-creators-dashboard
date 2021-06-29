import React, { useContext, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Box,
  Flex,
  Image,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { AuthContext } from "../../../../contexts/AuthContext";

const PublishModal = ({
  disclosure: { isOpen, onOpen, onClose },
  selectedPlan,
  selectPlan,
  recipientCount,
  publishNewsletter,
  pageStatus,
}) => {
  const {
    loggedInUser: { plans },
  } = useContext(AuthContext);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay blur={"10px"} />
        <ModalContent>
          <ModalBody mt={10}>
            <Text textAlign="center">Select recipients for the Newsletter</Text>
            <Flex alignItems="stretch" justifyContent="center">
              <Flex flexWrap="nowrap" mt={2}>
                {plans && plans.length > 0 ? (
                  plans.map(({ planFee, _id }, p) => {
                    return (
                      <PlanSelector
                        key={p}
                        planName={planFee === 0 ? "Free Plan" : "Paid Plan"}
                        planId={_id}
                        selectedPlan={selectedPlan}
                        selectPlan={selectPlan}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>

            {recipientCount && recipientCount > 0 ? (
              <>
                <Text mt={5} textAlign="center" fontSize={40} fontWeight="bold">
                  {recipientCount || 0}
                </Text>
                <Text
                  mt={1}
                  textAlign="center"
                  fontSize={16}
                  fontWeight="light"
                >
                  subscribers will receive this newsletter
                </Text>
              </>
            ) : (
              <></>
            )}
          </ModalBody>

          <ModalFooter justifyContent="center" flexDir="column">
            <Button
              color="bright.bg"
              bgColor="bright.fg"
              fontWeight="light"
              borderColor="bright.fg"
              borderWidth="1px"
              rounded="full"
              _focus={{
                outline: "none",
              }}
              onClick={publishNewsletter}
              disabled={
                pageStatus !== "loaded" ||
                selectedPlan === null ||
                selectedPlan === undefined
              }
            >
              {pageStatus === "publishing" ? (
                <Image src="/loader_white.gif" h="2rem" />
              ) : (
                "Start Sending"
              )}
            </Button>
            <Button
              color="bright.gray"
              variant="ghost"
              fontWeight="light"
              textDecoration="underline"
              p={0}
              fontSize={12}
              onClick={onClose}
              _focus={{
                outline: "none",
              }}
              disabled={pageStatus !== "loaded"}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const PlanSelector = ({ planName, planId, selectedPlan, selectPlan }) => {
  return (
    <>
      <Box mr={"-1px"}>
        <Button
          border="1px"
          borderColor="bright.fg"
          borderRadius={0}
          pt={8}
          pb={8}
          pl={4}
          pr={4}
          bgColor={planId === selectedPlan ? "bright.fg" : "transparent"}
          transitionDuration="0.1s"
          _hover={
            planId === selectedPlan
              ? {}
              : {
                  bgColor: "bright.light",
                }
          }
          _focus={{
            outline: "none",
          }}
          onClick={() => selectPlan(planId)}
        >
          <Flex alignItems="center">
            <Flex alignItems="center" mr={3}>
              <Image
                src={
                  planId === selectedPlan ? "/selected.png" : "/unselected.png"
                }
                w={5}
                h={5}
              />
            </Flex>
            <Box>
              <Text
                fontSize={20}
                textAlign="left"
                color={planId === selectedPlan ? "bright.bg" : "bright.fg"}
              >
                {planName}
              </Text>
              <Text
                fontSize={14}
                fontWeight="light"
                textAlign="left"
                color={planId === selectedPlan ? "bright.bg" : "bright.fg"}
              >
                Subscribers
              </Text>
            </Box>
          </Flex>
        </Button>
      </Box>
    </>
  );
};

export default PublishModal;
