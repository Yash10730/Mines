import './Square.css';
// import hoverEffect from '../assets/Sound/hover.wav';
import MinesSound from '../assets/Sound/Mines.wav';
import DiamondEffect from '../assets/Sound/Gem.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';
import { useEffect, useState } from 'react';

function Square({ mine, setGameOver, gameOver, setScore, onOpen }) {
    let [image, setImage] = useState(null);

    useEffect(() => {
        if (gameOver) {
            if (mine) {
                setImage(bombIcon);
            } else {
                setImage(goldIcon);
            }
        }
    }, [gameOver, mine]);

    function mouseEnterHandle() {
        if (!image) {
            const sound = new Audio(hoverEffect);
            sound.play();
        }
    }

    function clickHandler() {
        if (gameOver) return;

        if (!mine) {
            setScore((prevValue) => prevValue * 2);
            setImage(goldIcon);
            const sound = new Audio(DiamondEffect);
            sound.play();
            if (onOpen) onOpen(); // Notify that a non-mine square was opened
        } else {
            const sound = new Audio(MinesSound);
            sound.play(); // Play the bomb sound

            setGameOver(true);
            // alert("You Lose The Game");
        }
    }

    return (
        <div
            className='square-item'
            onMouseEnter={mouseEnterHandle}
            onClick={clickHandler}
        >
            {image && <img height={90} width={90} src={image} />}
        </div>
    );
}

export default Square;
