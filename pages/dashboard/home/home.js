import {
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  Avatar,
  Button,
  Box
} from '@chakra-ui/react'
import { FiHome, FiMail, FiUsers, FiUser, FiLogOut } from 'react-icons/fi'

import { getCardsData } from '../../../dummy-data'

import classes from './home.module.scss'

const HomePage = () => {
  const cards = getCardsData()

  return (
    <Flex h='100vh' flexDir='row' overflow='hidden' maxW='2000px'>
      {/* Column 1 */}
      <Flex flexDir='column' alignItems='center' className={classes.sidebar}>
        <Flex flexDir='column' justifyContent='space-between' h='100vh'>
          <Flex flexDir='column' as='nav'>
            <Heading
              mt={50}
              mb={100}
              fontSize='4xl'
              alignSelf='center'
              letterSpacing='tight'
            >
              Chitti.
            </Heading>
            <Flex
              flexDir='column'
              alignItems='flex-start'
              justifyContent='center'
            >
              <Flex className={classes.sidebarItem}>
                <Link>
                  <Icon
                    as={FiHome}
                    fontSize='2xl'
                    className={classes.activeIcon}
                  />
                </Link>
                <Link _hover={{ textDecor: 'none' }}>
                  <Text className={classes.active}>Home</Text>
                </Link>
              </Flex>

              <Flex className={classes.sidebarItem}>
                <Link>
                  <Icon as={FiMail} fontSize='2xl' />
                </Link>
                <Link _hover={{ textDecor: 'none' }}>
                  <Text>Newsletters</Text>
                </Link>
              </Flex>

              <Flex className={classes.sidebarItem}>
                <Link>
                  <Icon as={FiUsers} fontSize='2xl' />
                </Link>
                <Link _hover={{ textDecor: 'none' }}>
                  <Text>Subscribers</Text>
                </Link>
              </Flex>

              <Flex className={classes.sidebarItem}>
                <Link>
                  <Icon as={FiUser} fontSize='2xl' />
                </Link>
                <Link _hover={{ textDecor: 'none' }}>
                  <Text>Profile</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir='column' alignItems='center' mb={10} mt={5}>
            <Avatar name='Rushiraj Brahmbhatt' src='media.png' />
            <Text textAlign='center' mt={3}>
              Rushiraj Brahmbhatt
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Column 2 */}
      <Flex w='85%' flexDir='column' justifyContent='space-between'>
        {/* Row 1 */}
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
            >
              Create New Newsletter
            </Button>
            <Button
              rounded={'full'}
              variant='outline'
              className={classes.topbarButton}
            >
              Sign Out
              <Icon as={FiLogOut} fontSize='lg' />
            </Button>
          </Flex>
        </Flex>

        {/* Row 2 */}
        <Flex className={classes.mainContent}>
          {cards?.map((card) => (
            <Box
              key={card.id}
              rounded={25}
              marginTop={4}
              className={classes.dashboardCard}
            >
              <Flex
                p='1em'
                color='#fff'
                flexDir='column'
                h='100%'
                justifyContent='space-between'
              >
                <Text color='#fff' fontSize='2xl' fontWeight='medium'>
                  {card.title}
                </Text>
                <Text fontWeight='bold' fontSize='5xl' color='#333'>
                  {card.total}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HomePage
