import { Flex, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

const ErrorMessage = ({ message }) => {
  return (
    <Flex my={4} w="100%">
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Flex>
  );
};

export default ErrorMessage;
