import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Square from './Square/Square';
import Footer from './Footer'; // Import Footer component

// Constants for better code readability
const GRID_SIZE = 25;
const MAX_MINES = 24;
const MAX_BET = 500;

// Generates a random integer between min and max (inclusive).
function getRandomInt(min, max) {
  // Handle case where min is greater than max
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates a set of unique mine positions based on the number of mines.
function generateMines(numMines) {
  const randomNumbers = new Set();
  while (randomNumbers.size < numMines) {
    randomNumbers.add(getRandomInt(1, GRID_SIZE));
  }
  return [...randomNumbers];
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [openedSquares, setOpenedSquares] = useState(new Set());
  const [mines, setMines] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [numMines, setNumMines] = useState(1);
  const [initialScore, setInitialScore] = useState(10);
  const [isExit, setIsExit] = useState(false);

  // Win condition: Ensure the number of opened squares matches the number of non-mine squares.
  useEffect(() => {
    if (openedSquares.size === GRID_SIZE - mines.length && !gameOver) {
      setGameOver(true);
      alert(`Congratulations! You won ₹ ${score}`);
    }
  }, [openedSquares, gameOver, mines.length, score]);

  // Start game with validated settings.
  const startGame = useCallback(() => {
    if (numMines > 0 && numMines <= MAX_MINES && initialScore >= 0 && initialScore <= MAX_BET) {
      setMines(generateMines(numMines));
      setScore(initialScore);
      setIsGameStarted(true);
      setGameOver(false);
      setOpenedSquares(new Set());
      setIsExit(false);
    } else {
      alert("Invalid game settings. Please check the number of mines and bet amount.");
    }
  }, [numMines, initialScore]);

  // Function to reset the game.
  const resetGame = useCallback(() => {
    setMines([]);
    setScore(0);
    setIsGameStarted(false);
    setOpenedSquares(new Set());
    setGameOver(false);
    setIsExit(false);
  }, []);

  // Handle the game exit logic.
  const exitGame = useCallback(() => {
    setIsExit(true);
    setGameOver(true);
    alert(`You won ₹ ${score}`);
  }, [score]);

  // Handle the square click.
  const handleSquareClick = useCallback(
    (index) => {
      if (openedSquares.has(index)) {
        return; // If square is already opened, do nothing.
      }
      if (mines.includes(index)) {
        setGameOver(true);
        alert(`Game Over! You lost ₹ ${score}`);
      } else {
        const multiplier = numMines * 10; // Increase multiplier with the number of mines
        setOpenedSquares((prev) => new Set(prev).add(index));
        setScore((prev) => prev + initialScore + multiplier); // Increment score by bet amount + multiplier
      }
    },
    [mines, initialScore, numMines, openedSquares]
  );

  // Memoized renderSquare to prevent unnecessary re-renders.
  const renderSquare = useCallback(
    (index) => (
      <Square
        mine={mines.includes(index)}
        onOpen={() => handleSquareClick(index)}
        key={index}
      />
    ),
    [mines, handleSquareClick]
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
              onChange={(e) => setNumMines(Math.min(Math.max(parseInt(e.target.value), 1), MAX_MINES))}
              min="1"
              max={MAX_MINES}
            />
          </div>
          <div>
            <label>Total Amount to Bet ₹: </label>
            <input
              type="number"
              value={initialScore}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= MAX_BET) {
                  setInitialScore(value);
                }
              }}
              min="0"
              max={MAX_BET}
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
                  <button className="dembtn" onClick={resetGame}>
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
              {Array.from({ length: GRID_SIZE }, (_, index) => renderSquare(index + 1))}
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
