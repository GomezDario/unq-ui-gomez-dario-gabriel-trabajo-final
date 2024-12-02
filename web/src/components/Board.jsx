import React, { useState, useEffect } from 'react';
import './Board.css';

const generateCards = (size) => {
  const totalCards = size * size;
  const values = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
  const deck = [...values, ...values].sort(() => Math.random() - 0.5);
  return deck.map((value, index) => ({
    id: index,
    value,
    flipped: false,
    matched: false,
  }));
};

function Board({ size = 4 }) {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  useEffect(() => {
    setCards(generateCards(size));
  }, [size]);

  const handleCardClick = (card) => {
    if (card.flipped || card.matched || secondCard) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      if (firstCard.value === card.value) {
        setCards((prev) =>
          prev.map((c) =>
            c.value === card.value ? { ...c, matched: true } : c
          )
        );
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            )
          );
        }, 1000);
      }
      setFirstCard(null);
      setSecondCard(null);
    }
  };

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
          onClick={() => handleCardClick(card)}
        >
          <div className="card-front"></div>
          <div className="card-back">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

export default Board;
