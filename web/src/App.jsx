import { useState } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [gameKey, setGameKey] = useState(0);

  const handleRestart = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <h1>Memotest</h1>
      <Board key={gameKey} size={4} onRestart={handleRestart} />
    </div>
  );
}

export default App;
