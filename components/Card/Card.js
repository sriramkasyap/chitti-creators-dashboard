import { Box, Flex, Text, Icon } from '@chakra-ui/react'

import classes from './Card.module.scss'

const Card = ({ title, subtitle }) => {
  return (
    <Box rounded={25} marginTop={4} className={classes.dashboardCard}>
      <Flex
        p={5}
        flexDir='column'
        h='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Text
          color='bright.black'
          fontSize='3xl'
          fontWeight='medium'
          textAlign='center'
        >
          {title}
        </Text>
        <Text
          fontWeight='bold'
          fontSize='6xl'
          color='bright.black'
          textAlign='center'
        >
          {subtitle}
        </Text>
      </Flex>
    </Box>
  )
}

export default Card
