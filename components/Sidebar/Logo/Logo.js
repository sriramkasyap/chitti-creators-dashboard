import { Heading } from '@chakra-ui/react'

import classes from './Logo.module.scss'

const Logo = ({ title }) => {
  return (
    <Heading
      mb={100}
      mt={50}
      fontSize='4xl'
      alignSelf='center'
      letterSpacing='tight'
      className={classes.header}
    >
      {title}
    </Heading>
  )
}

export default Logo
