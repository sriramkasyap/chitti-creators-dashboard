import PropTypes from "prop-types";
import { Text, Box, Flex, Image, Button } from "@chakra-ui/react";

import { noop } from "../../../../utils";

const PlanSelector = ({ planName, planId, selectedPlan, selectPlan }) => {
  return (
    <>
      <Box mr="-1px">
        <Button
          border="1px"
          borderColor="bright.fg"
          borderRadius={0}
          pt={8}
          pb={8}
          pl={4}
          pr={4}
          bgColor={planId === selectedPlan ? "bright.fg" : "transparent"}
          transitionDuration="0.1s"
          _hover={
            planId === selectedPlan
              ? {}
              : {
                  bgColor: "bright.light",
                }
          }
          _focus={{
            outline: "none",
          }}
          onClick={() => selectPlan(planId)}
        >
          <Flex alignItems="center">
            <Flex alignItems="center" mr={3}>
              <Image
                src={
                  planId === selectedPlan ? "/selected.png" : "/unselected.png"
                }
                w={5}
                h={5}
              />
            </Flex>
            <Box>
              <Text
                fontSize={20}
                textAlign="left"
                color={planId === selectedPlan ? "bright.bg" : "bright.fg"}
              >
                {planName}
              </Text>
              <Text
                fontSize={14}
                fontWeight="light"
                textAlign="left"
                color={planId === selectedPlan ? "bright.bg" : "bright.fg"}
              >
                Subscribers
              </Text>
            </Box>
          </Flex>
        </Button>
      </Box>
    </>
  );
};

PlanSelector.propTypes = {
  planName: PropTypes.string,
  planId: PropTypes.string,
  selectedPlan: PropTypes.string,
  selectPlan: PropTypes.func,
};

PlanSelector.defaultProps = {
  planName: "",
  planId: "",
  selectedPlan: "",
  selectPlan: noop,
};

export default PlanSelector;
