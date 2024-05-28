import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import {
  changeDirection,
  gameOver,
  updateGame,
  renderFood,
} from "../Redux/Slices/gameSlices";
import Board from "../Components/gameBoard";
import Score from "../Components/scoreBoard";
import GameOverModal from "../Components/GameOverModal";

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { score, food, snake, gameLevel, userWallet, mode } = useSelector(
    (state: RootState) => state.game
  );

  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Use effect for updating the game state at regular intervals
  useEffect(() => {
    const moveSnake = setInterval(
      () => dispatch(updateGame()),
      gameLevel || 150
    );

    // Clean up the
    return () => clearInterval(moveSnake);
  }, [dispatch]);

  // Use effect for handling user input
  useEffect(() => {
    // Add a keydown event listener to handle direction changes
    document.addEventListener("keydown", (e) => dispatch(changeDirection(e)));

    return () =>
      document.removeEventListener("keydown", (e) =>
        dispatch(changeDirection(e))
      );
  }, [dispatch]);

  // Use effect for rendering food
  useEffect(() => {
    dispatch(renderFood());
  }, [dispatch]);

  // Use effect for checking game over conditions
  useEffect(() => {
    // Check if the snake goes out of bounds
    if (
      snake[0].x < 0 ||
      snake[0].x >= 20 ||
      snake[0].y < 0 ||
      snake[0].y >= 20
    ) {
      setIsGameOver(true);
    }
  }, [snake, dispatch]);

  const restartGame = () => {
    dispatch(gameOver());
    setIsGameOver(false);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      {isGameOver && <GameOverModal restartGame={restartGame} userWallet={userWallet} mode={mode} score={score} />}
      <div className="w-1/2">
        <Score score={score} userWallet={userWallet} level={mode}/>
      </div>
      <div className="w-1/2">
        <Board gridSize={20} food={food} snake={snake}/>
      </div>
    </main>
  );
};

export default Game;
