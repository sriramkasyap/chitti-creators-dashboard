import PropTypes from "prop-types";
import { Flex, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const SuccessAlert = ({ message }) => {
  return (
    <Flex my={4} w="100%">
      <Alert status="success" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Flex>
  );
};

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessAlert;
