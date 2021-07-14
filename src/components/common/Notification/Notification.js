import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const Notification = ({ message }) => (
  <Box data-testid="notification" color="white" p={3} bg="bright.fg">
    {message}
  </Box>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
