const DUMMY_CARDS_DATA = [
  {
    id: 1,
    title: "Active Subscribers",
    total: "30k",
    icon: "user.png",
  },
  {
    id: 2,
    title: "Paid Subscribers",
    total: "21.5k",
    icon: "user.png",
  },
  {
    id: 3,
    title: "Revenue Till Date",
    total: "$1500",
    icon: "money.png",
  },
  {
    id: 4,
    title: "Newsletters Sent",
    total: "28",
    icon: "envelope.png",
  },
];

export function getCardsData() {
  return DUMMY_CARDS_DATA;
}
