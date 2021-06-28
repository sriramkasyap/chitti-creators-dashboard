import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ text, rounded, variant, className, onClick, ...rest }) => {
  return (
    <ChakraButton
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
};

export default Button;
