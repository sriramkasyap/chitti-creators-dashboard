import PropTypes from "prop-types";

import { Flex, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const ErrorAlert = ({ message }) => (
  <Flex my={4} w="100%">
    <Alert status="error" borderRadius={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Flex>
);

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
