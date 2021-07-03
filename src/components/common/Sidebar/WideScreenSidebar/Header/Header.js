import PropTypes from "prop-types";

import { Heading } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Heading mt={3.5} fontSize="6xl" alignSelf="center" letterSpacing="tight">
      {title}
    </Heading>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
