import { FiHome, FiMail, FiUsers, FiUser } from "react-icons/fi";

const NAV_ITEMS = [
  {
    id: 1,
    link: "/",
    icon: FiHome,
    text: "Dashboard",
  },
  {
    id: 2,
    link: "/newsletters",
    icon: FiMail,
    text: "Newsletters",
  },
  {
    id: 3,
    link: "/subscribers",
    icon: FiUsers,
    text: "Subscribers",
  },
  {
    id: 4,
    link: "/profile",
    icon: FiUser,
    text: "My Profile",
  },
];

export const getNavItems = () => {
  return NAV_ITEMS;
};
