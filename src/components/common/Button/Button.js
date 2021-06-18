import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ text, rounded, variant, className, ...rest }) => {
  return (
    <ChakraButton
      rounded={rounded}
      variant={variant}
      className={className}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
};

export default Button;
