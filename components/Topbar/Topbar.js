import { Flex } from '@chakra-ui/react'

import Button from '../Button/Button'

import classes from './Topbar.module.scss'

const Topbar = () => {
  return (
    <Flex
      flexDir='row'
      alignItems='center'
      justifyContent='flex-end'
      className={classes.topBar}
    >
      <Flex className={classes.topbarItem} alignItems='center'>
        <Button
          rounded={'full'}
          variant='outline'
          className={classes.topbarButton}
          text='Create New Newsletter'
        />
      </Flex>
    </Flex>
  )
}

export default Topbar
