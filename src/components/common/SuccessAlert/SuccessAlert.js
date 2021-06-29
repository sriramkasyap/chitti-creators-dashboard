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

export default SuccessAlert;
