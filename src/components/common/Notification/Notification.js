import { Box } from "@chakra-ui/react";

const Notification = ({ message }) => {
  return (
    <Box color="white" p={3} bg="bright.fg">
      {message}
    </Box>
  );
};

export default Notification;
