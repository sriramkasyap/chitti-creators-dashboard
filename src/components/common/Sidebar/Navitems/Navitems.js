import Link from 'next/link'
import { Flex, Text, Icon } from '@chakra-ui/react'
import { FiHome, FiMail, FiUsers, FiUser } from 'react-icons/fi'

import classes from './Navitems.module.scss'

const Navitems = () => {
  return (
    <Flex flexDir='column' alignItems='flex-start' justifyContent='center'>
      <Flex className={classes.sidebarItem}>
        <Link href='/'>
          <a>
            <Icon as={FiHome} fontSize='2xl' className={classes.activeIcon} />
            <Text className={classes.active}>Home</Text>
          </a>
        </Link>
      </Flex>

      <Flex className={classes.sidebarItem}>
        <Link href='/newsletters'>
          <a>
            <Icon as={FiMail} fontSize='2xl' />
            <Text>Newsletters</Text>
          </a>
        </Link>
      </Flex>

      <Flex className={classes.sidebarItem}>
        <Link href='/subscribers'>
          <a>
            <Icon as={FiUsers} fontSize='2xl' />
            <Text>Subscribers</Text>
          </a>
        </Link>
      </Flex>

      <Flex className={classes.sidebarItem}>
        <Link href='/profile'>
          <a>
            <Icon as={FiUser} fontSize='2xl' />
            <Text>Profile</Text>
          </a>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navitems
