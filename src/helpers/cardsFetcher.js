import { v4 as uuidv4 } from "uuid";

const DUMMY_CARDS_DATA = [
  {
    id: uuidv4(),
    title: "Active Subscribers",
    total: "30k",
  },
  {
    id: uuidv4(),
    title: "Paid Subscribers",
    total: "21.5k",
  },
  {
    id: uuidv4(),
    title: "Revenue Till Date",
    total: "$ 1500",
  },
  {
    id: uuidv4(),
    title: "Newsletters Sent",
    total: "28",
  },
];

export function getCardsData() {
  return DUMMY_CARDS_DATA;
}
