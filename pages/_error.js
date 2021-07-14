import PropTypes from "prop-types";
import { Box, Flex, Text } from "@chakra-ui/react";

const Error = ({ statusCode }) => {
  return (
    <>
      {statusCode && (
        <Box height="100vh" width="100%" display="flex" justifyContent="center">
          <Flex
            width="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              textTransform="uppercase"
              mb={3}
            >
              {`An error ${statusCode} occurred on server`}
            </Text>
          </Flex>
        </Box>
      )}
    </>
  );
};

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default Error;

export const getServerSideProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    props: {
      statusCode,
    },
  };
};
