import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Flex,
  Image,
  ModalFooter,
} from "@chakra-ui/react";

import Button from "../Button/Button";
import { AuthContext } from "../../../../contexts/AuthContext";
import PlanSelector from "./PlanSelector/PlanSelector";

import { noop } from "../../../utils";

const PublishModal = ({
  selectedPlan,
  pageStatus,
  selectPlan,
  recipientCount,
  disclosure: { isOpen, onOpen, onClose },
  publishNewsletter,
}) => {
  const {
    loggedInUser: { plans },
  } = useContext(AuthContext);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay blur="10px" />
        <ModalContent>
          <ModalBody mt={10}>
            <Text textAlign="center">Select recipients for the Newsletter</Text>
            <Flex alignItems="stretch" justifyContent="center">
              <Flex flexWrap="nowrap" mt={2}>
                {plans && plans.length > 0 ? (
                  plans.map(({ planFee, _id }) => (
                    <PlanSelector
                      key={_id}
                      planName={planFee === 0 ? "Free Plan" : "Paid Plan"}
                      planId={_id}
                      selectedPlan={selectedPlan}
                      selectPlan={selectPlan}
                    />
                  ))
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
              text={
                pageStatus === "publishing" ? (
                  <Image src="/loader_white.gif" h="2rem" />
                ) : (
                  "Start Sending"
                )
              }
              color="bright.bg"
              bgColor="bright.fg"
              fontWeight="light"
              borderColor="bright.fg"
              borderWidth="1px"
              rounded="full"
              _focus={{
                outline: "none",
              }}
              _hover={{
                bg: "transparent",
                color: "bright.fg",
                borderColor: "bright.fg",
              }}
              onClick={publishNewsletter}
              disabled={
                pageStatus !== "loaded" ||
                selectedPlan === null ||
                selectedPlan === undefined
              }
            />
            <Button
              text="Cancel"
              color="bright.gray"
              variant="link"
              fontWeight="light"
              textDecoration="underline"
              p={0}
              mt={3}
              fontSize={12}
              onClick={onClose}
              disabled={pageStatus !== "loaded"}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

PublishModal.propTypes = {
  selectedPlan: PropTypes.string,
  pageStatus: PropTypes.string,
  recipientCount: PropTypes.number,
  disclosure: PropTypes.instanceOf(Object),
  selectPlan: PropTypes.func,
  publishNewsletter: PropTypes.func,
};

PublishModal.defaultProps = {
  selectedPlan: "",
  pageStatus: "",
  recipientCount: 0,
  disclosure: {},
  selectPlan: noop,
  publishNewsletter: noop,
};

export default PublishModal;
