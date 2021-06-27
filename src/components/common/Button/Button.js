import { motion } from "framer-motion";
import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ text, rounded, variant, className, onClick, ...rest }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
    </motion.div>
  );
};

export default Button;
