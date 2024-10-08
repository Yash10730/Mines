import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Square from './Square/Square';
import Footer from './Footer'; // Import Footer component

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMines(numMines) {
  const randomNumbers = new Set();
  while (randomNumbers.size < numMines) {
    randomNumbers.add(getRandomInt(1, 25));
  }
  return [...randomNumbers];
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [openedSquares, setOpenedSquares] = useState(0);
  const [mines, setMines] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [numMines, setNumMines] = useState(1);
  const [initialScore, setInitialScore] = useState(10);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    if (openedSquares === 25 - mines.length && !gameOver) {
      setGameOver(true);
      alert(`Congratulations! You won ₹ ${score}`);
    }
  }, [openedSquares, gameOver, mines.length, score]);

  const startGame = useCallback(() => {
    setMines(generateMines(numMines));
    setScore(initialScore);
    setIsGameStarted(true);
    setGameOver(false);
    setOpenedSquares(0);
    setIsExit(false);
  }, [numMines, initialScore]);

  const restartGame = useCallback(() => {
    setMines([]);
    setScore(0);
    setIsGameStarted(false);
    setOpenedSquares(0);
    setGameOver(false);
    setIsExit(false);
  }, []);

  const exitGame = useCallback(() => {
    setIsExit(true);
    setGameOver(true);
    alert(`You won ₹ ${score}`);
  }, [score]);

  const handleSquareClick = useCallback(
    (index) => {
      if (mines.includes(index)) {
        setGameOver(true);
        alert(`Game Over! You lost ₹ ${score}`);
      } else {
        const multiplier = numMines * 10; // Increase multiplier with the number of mines
        setOpenedSquares((prev) => prev + 1);
        setScore((prev) => prev + initialScore + multiplier); // Increment score by bet amount + multiplier
      }
    },
    [mines, initialScore, numMines]
  );

  const renderSquare = useCallback(
    (index) => (
      <Square
        setScore={setScore}
        gameOver={gameOver}
        setGameOver={setGameOver}
        mine={mines.includes(index)}
        onOpen={() => handleSquareClick(index)}
        key={index}
      />
    ),
    [gameOver, mines, handleSquareClick]
  );

  return (
    <>
      {!isGameStarted ? (
        <div className="setup-form">
          <h2>Setup Your Game</h2>
          <div>
            <label>Number of Mines: </label>
            <input
              type="number"
              value={numMines}
              onChange={(e) => setNumMines(Math.min(Math.max(parseInt(e.target.value), 1), 24))}
              min="1"
              max="24"
            />
          </div>
          <div>
            <label>Total Amount to Bet ₹: </label>
            <input
              type="number"
              value={initialScore}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 500) {
                  setInitialScore(value);
                }
              }}
              min="0"
              max="500"
            />
          </div>
          <button className="demobtn2" onClick={startGame}>
            Bet
          </button>
        </div>
      ) : (
        <>
          <div className="game-container">
            <div className="totalScore">
              <p> Bet Amount: ₹ {initialScore}</p> {/* Display the initial bet amount */}
              <p>You Won: ₹ {score}</p> {/* Display the current amount */}
              {gameOver && (
                <>
                  <p>{isExit ? `You won ₹ ${score}` : `Game Over! You lost ₹ ${score}`}</p>
                  <button className="dembtn" onClick={restartGame}>
                    Bet Again
                  </button>
                </>
              )}
              {!gameOver && (
                <button className="exitbtn" onClick={exitGame}>
                  Cash out
                </button>


              )}
                <pre></pre>
            </div>
            <div className="d-grid">
              {Array.from({ length: 25 }, (_, index) => renderSquare(index + 1))}
            </div>
          </div>
          <div style={{ marginTop: '20px' }}></div> {/* Space between square grid and footer */}
          <Footer /> {/* Include the Footer component here */}
        </>
      )}
    </>
  );
}

export default App;