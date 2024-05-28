import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface Food {
  x: number;
  y: number;
}

interface SnakePart {
  x: number;
  y: number;
}

interface GameState {
  // speed: number;
  mode: string;
  score: number;
  food: Food;
  snake: SnakePart[];
  direction: string;
  gameLevel: number;
  userWallet: string | null;
}

const initialState: GameState = {
  // speed: 1,
  mode: "start",
  score: 0,
  food: { x: 5, y: 5 },
  snake: [
    {
      x: 10,
      y: 10,
    },
    {
      x: 10,
      y: 11,
    },
  ],
  direction: "LEFT",
  gameLevel: 0,
  userWallet: null
};

function generateNewFood(snake: SnakePart[]) {
  const gridSize = 20;
  let randomX: number, randomY: number;
  do {
    randomX = Math.floor(Math.random() * gridSize);
    randomY = Math.floor(Math.random() * gridSize);
  } while (snake.some((part) => part.x === randomX && part.y === randomY));
  return { x: randomX, y: randomY };
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changeDirection: (state, action: PayloadAction<{ code: string }>) => {
      const key = action.payload.code;

      switch (key) {
        case "ArrowUp":
          if (state.direction !== "DOWN") state.direction = "UP";
          break;
        case "ArrowDown":
          if (state.direction !== "UP") state.direction = "DOWN";
          break;
        case "ArrowLeft":
          if (state.direction !== "RIGHT") state.direction = "LEFT";
          break;
        case "ArrowRight":
          if (state.direction !== "LEFT") state.direction = "RIGHT";
          break;
      }
    },
    renderFood: (state) => {
      const randomX = Math.floor(Math.random() * 20);
      const randomY = Math.floor(Math.random() * 20);

      state.food = {
        x: randomX,
        y: randomY,
      };
    },
    gameOver: (state) => {
      state.score = 0;
      state.snake = initialState.snake;
      state.direction = initialState.direction;
      // state.speed = 0;
    },

    restrart: (state) => {
      state.score = 0;
      state.snake = initialState.snake;
      state.direction = initialState.direction;
    },

    updateGame: (state) => {
      const { snake, food, direction } = state;
      const newSnake = [...snake];

      // Calculate the new head position based on the direction
      let newHead: SnakePart | undefined;
      switch (direction) {
        case "UP":
          newHead = { x: snake[0].x - 1, y: snake[0].y };
          break;
        case "DOWN":
          newHead = { x: snake[0].x + 1, y: snake[0].y };
          break;
        case "LEFT":
          newHead = { x: snake[0].x, y: snake[0].y - 1 };
          break;
        case "RIGHT":
          newHead = { x: snake[0].x, y: snake[0].y + 1 };
          break;
        default:
          break;
      }

      if (newHead) {
        // Add the new head to the snake from the front side
        newSnake.unshift(newHead);

        // Check if the snake has eaten the food
        if (newHead.x === food.x && newHead.y === food.y) {
          state.score += 5;
          state.food = generateNewFood(snake);
        } else {
          newSnake.pop();
        }

        // Update the snake state
        state.snake = newSnake;
      }
    },
    setGameLevel: (state, action: PayloadAction<{ level: number; wallet: string }>) => {
      state.gameLevel = action.payload.level;
      if (action.payload.level === 300) {
        state.mode = "EASY";
      } else if (action.payload.level === 200) {
        state.mode = "MEDIUM";
      } else {
        state.mode = "HARD";
      }
    },

    setUserWallet: (state, action: PayloadAction<string | null>) => {
      state.userWallet = action.payload;
    },
  },
});

export const {
  changeDirection,
  renderFood,
  gameOver,
  updateGame,
  setGameLevel,
  restrart,
  setUserWallet
} = gameSlice.actions;

export default gameSlice.reducer;
