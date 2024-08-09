import { useState, useEffect } from 'react';
import Square from './Square'; // Import the Square component
import Footer from '../Footer';

function GameBoard() {
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(1); // Initial score
    const [highestScore, setHighestScore] = useState(() => {
        return parseInt(localStorage.getItem('highestScore')) || 0;
    });

    useEffect(() => {
        if (score > highestScore) {
            setHighestScore(score);
            localStorage.setItem('highestScore', score);
        }
    }, [score, highestScore]);

    function restartGame() {
        setGameOver(false);
        setScore(1); // Reset the score to the initial value
    }

    return (
        <div>
            <div className="game-board">
                {/* Render multiple Square components here as needed */}
                <Square mine={true} setGameOver={setGameOver} gameOver={gameOver} setScore={setScore} />
                <Square mine={false} setGameOver={setGameOver} gameOver={gameOver} setScore={setScore} />
                {/* Add more Squares as needed */}
            </div>
            {gameOver && (
                <div className="game-over">
                    <p>Game Over!</p>
                    <p>Highest Score: {highestScore}</p>
                    <button onClick={restartGame}>Restart Game</button>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default GameBoard;