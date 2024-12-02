import { useState } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [gameKey, setGameKey] = useState(0); // Cambiará el key para reiniciar el juego

  const handleRestart = () => {
    setGameKey((prevKey) => prevKey + 1); // Incrementa el key para regenerar el tablero
  };

  return (
    <div className="App">
      <h1>Memotest</h1>
      <Board key={gameKey} size={4} />
      <button onClick={handleRestart} className="restart-button">
        Reiniciar Juego
      </button>
    </div>
  );
}

export default App;
