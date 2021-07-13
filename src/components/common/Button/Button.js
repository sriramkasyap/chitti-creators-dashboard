import PropTypes from "prop-types";

import { Button as ChakraButton } from "@chakra-ui/react";
import { noop } from "../../../utils";

const Button = ({ text, rounded, variant, className, onClick, ...rest }) => (
  <ChakraButton
    data-testid="chakra-btn"
    rounded={rounded}
    variant={variant}
    className={className}
    onClick={onClick}
    _focus={{ boxShadow: "none" }}
    {...rest}
  >
    {text}
  </ChakraButton>
);

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rounded: PropTypes.string,
  variant: PropTypes.oneOf(["link", "outline", "solid", "ghost", "unstyled"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: "",
  rounded: "",
  variant: "solid",
  className: "",
  onClick: noop,
};

export default Button;
