import Card from "../components/Card/Card";
import { getCardsData } from "../helpers/cardsFetcher";

const HomePage = () => {
  const cards = getCardsData();

  return (
    <>
      {cards?.map((card, i) => (
        <Card key={i} title={card.title} subtitle={card.total} />
      ))}
    </>
  );
};

export default HomePage;
