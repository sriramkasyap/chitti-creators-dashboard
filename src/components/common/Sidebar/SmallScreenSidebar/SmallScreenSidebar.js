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

import { getUserData } from "../../../../helpers/userFetcher";

const SmallScreenSidebar = () => {
  const user = getUserData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton ref={btnRef} icon={<FiMenu />} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="bright.black" color="bright.white">
          <DrawerCloseButton />
          <DrawerHeader>
            <Header user={user} />
          </DrawerHeader>

          <DrawerBody>
            <Navitems />
          </DrawerBody>

          <DrawerFooter justifyContent="flex-start">
            <Footer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SmallScreenSidebar;
