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

function Board({ size = 4, onRestart }) {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0); // Nuevo estado para el puntaje

  useEffect(() => {
    setCards(generateCards(size));
  }, [size]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (card) => {
    if (isLocked || card.flipped || card.matched || secondCard) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setIsLocked(true);

      if (firstCard.value === card.value) {
        setCards((prev) =>
          prev.map((c) =>
            c.value === card.value ? { ...c, matched: true } : c
          )
        );
        setScore((prevScore) => prevScore + 10); // Sumar 10 puntos por cada pareja acertada
        setTimeout(() => setIsLocked(false), 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setIsLocked(false);
        }, 1000);
      }
      setFirstCard(null);
      setSecondCard(null);
    }
  };

  const handleRestart = () => {
    setGameWon(false);
    setScore(0); // Reiniciar el puntaje al reiniciar el juego
    setCards(generateCards(size));
  };

  return (
    <div className="board-container">
      <h2>Score: {score}</h2> {/* Mostrar el puntaje */}
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
      {gameWon && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Ganaste!</h2>
            <p>¡Felicitaciones por completar el juego!</p>
            <button onClick={handleRestart} className="restart-button">
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
      {!gameWon && (
        <button onClick={handleRestart} className="restart-button">
          Reiniciar Juego
        </button>
      )}
    </div>
  );
}

export default Board;
