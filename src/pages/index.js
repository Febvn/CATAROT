import { useState } from 'react'
import Parallax from '@/components/Parallax'
import { majorArcana, getRandomMeaning } from '@/data/tarotData'

function Home() {
  const [cards, setCards] = useState([null, null, null])
  const [selectedCard, setSelectedCard] = useState(null)

  const flipCard = (index) => {
    const usedIds = cards.filter(c => c).map(c => c.id)
    const available = majorArcana.filter(c => !usedIds.includes(c.id))
    const pool = available.length > 0 ? available : majorArcana
    const card = pool[Math.floor(Math.random() * pool.length)]
    const meaning = getRandomMeaning(card)
    const newCard = { id: card.id, name: card.name, meaning }
    const newCards = [...cards]
    newCards[index] = newCard
    setCards(newCards)
    setSelectedCard(newCard)
  }

  const openReading = (card) => {
    if (!card.meaning) {
      const c = majorArcana.find(c => c.id === card.id)
      card.meaning = getRandomMeaning(c)
    }
    setSelectedCard(card)
  }

  return (
    <>
      <Parallax />
      <div className='about'>
        <h2>
          Tell Me what u Want to know Meooww!!
        </h2>
        <div className='card-row'>
          {cards.map((card, i) => (
            <div key={i} className={`flip-card ${card ? 'flipped' : ''}`} onClick={() => card ? openReading(card) : flipCard(i)}>
              <div className='flip-inner'>
                <div className='flip-front'>
                  <img src='/images/back.JPG' alt='Card back' className='card-back' />
                </div>
                {card && (
                  <div className='flip-back'>
                    <img src={`/images/${card.id}. ${card.name}.png`} alt={card.name} className='card-back' />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className='credit'>Created By Febvn</p>
      </div>

      {selectedCard && (
        <div className='modal-overlay' onClick={() => setSelectedCard(null)}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <button className='modal-close' onClick={() => setSelectedCard(null)}>×</button>
            <div className='modal-body'>
              <div className='modal-card'>
                <img src={`/images/${selectedCard.id}. ${selectedCard.name}.png`} alt={selectedCard.name} />
              </div>
              <div className='modal-meaning'>
                <h3>{selectedCard.name}</h3>
                <p>{selectedCard.meaning}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home