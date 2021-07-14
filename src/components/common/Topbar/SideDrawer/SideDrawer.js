import { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import Navitems from "./Navitems/Navitems";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        aria-label="Menu Button"
        ref={btnRef}
        icon={<FiMenu />}
        onClick={onOpen}
        fontSize="4xl"
        color="bright.gray"
        backgroundColor="bright.fg"
        _focus={{ boxShadow: "none" }}
        _hover={{ backgroundColor: "transparent" }}
        _active={{ backgroundColor: "transparent" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="bright.fg" color="bright.bg">
          <DrawerCloseButton
            color="bright.gray"
            fontSize="2xl"
            _focus={{ boxShadow: "none" }}
          />
          <DrawerHeader>
            <Header />
          </DrawerHeader>

          <DrawerBody>
            <Navitems onClose={onClose} />
          </DrawerBody>

          <DrawerFooter>
            <Footer onClose={onClose} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
