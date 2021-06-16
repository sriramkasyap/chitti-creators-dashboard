import Card from '../components/Card/Card'
import { getCardsData } from '../helpers/cardsFetcher'

const HomePage = () => {
  const cards = getCardsData()

  return (
    <>
      {cards?.map((card) => (
        <Card title={card.title} subtitle={card.total} />
      ))}
    </>
  )
}

export default HomePage
