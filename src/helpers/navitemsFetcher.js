import { v4 as uuidv4 } from "uuid";
import { FiHome, FiMail, FiUsers, FiUser } from "react-icons/fi";

const NAV_ITEMS = [
  {
    id: uuidv4(),
    link: "/",
    icon: FiHome,
    text: "Dashboard",
  },
  {
    id: uuidv4(),
    link: "/newsletters",
    icon: FiMail,
    text: "Newsletters",
  },
  {
    id: uuidv4(),
    link: "/subscribers",
    icon: FiUsers,
    text: "Subscribers",
  },
  {
    id: uuidv4(),
    link: "/profile",
    icon: FiUser,
    text: "My Profile",
  },
];

export const getNavItems = () => {
  return NAV_ITEMS;
};
