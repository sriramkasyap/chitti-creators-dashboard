import { Flex, Avatar, Text, Link } from '@chakra-ui/react'

const Footer = ({ user }) => {
  const fullName = `${user.first_name} ${user.last_name}`

  return (
    <Flex flexDir='column' alignItems='center' mb={10} mt={5}>
      <Avatar name={fullName} src={user.profile_image} />
      <Text textAlign='center' mt={3} mb={3}>
        {fullName}
      </Text>
      <Link _hover={{ textDecor: 'underline' }}>
        <Text>Sign Out</Text>
      </Link>
    </Flex>
  )
}

export default Footer
