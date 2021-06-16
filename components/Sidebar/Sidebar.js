import { Flex, IconButton } from '@chakra-ui/react'
import { FiArrowLeftCircle } from 'react-icons/fi'

import Logo from './Logo/Logo'
import Navitems from './Navitems/Navitems'
import Footer from './Footer/Footer'

import { getUserData } from '../../helpers/userFetcher'

import classes from './Sidebar.module.scss'

const Sidebar = () => {
  const user = getUserData()

  return (
    <Flex
      w='15%'
      flexDir='column'
      alignItems='center'
      className={classes.sidebar}
    >
      <Flex flexDir='column' justifyContent='space-between' h='100vh'>
        <Flex flexDir='column' as='nav'>
          <Logo title='Chitti.' />
          <Navitems />
        </Flex>
        <Footer user={user} />
      </Flex>
    </Flex>
  )
}

export default Sidebar
