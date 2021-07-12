import PropTypes from "prop-types";

import {
  Flex,
  Alert as ChakraAlert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

const Alert = ({ message, status, variant }) => (
  <Flex my={4} w="100%">
    <ChakraAlert status={status} variant={variant} borderRadius={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </ChakraAlert>
  </Flex>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["info", "warning", "success", "error"]),
  variant: PropTypes.oneOf(["solid", "subtle", "left-accent", "top-acent"]),
};

Alert.defaultProps = {
  status: "success",
  variant: "subtle",
};

export default Alert;
