import { Button as ChakraButton } from '@chakra-ui/react'

const Button = ({ text, rounded, variant, ...rest }) => {
  return (
    <ChakraButton rounded={rounded} variant={variant} {...rest}>
      {text}
    </ChakraButton>
  )
}

export default Button
