import React from "react";

interface ScoreProps {
  score: number;
  userWallet: string | null;
  level: string;
}

const Score: React.FC<ScoreProps> = ({ score, userWallet, level }) => {
  return (
    <div className="score">
      <div className="text-[bold] text-center text-[1.5rem]">Snake Game 🐍</div>
      <div className="text-center text-2xl font-bold">
        Player : <span className="text-blue-500">{userWallet}</span>
      </div>
      <div className="text-center text-2xl font-bold">
        Level : <span className={`${level === "HARD" ? 'text-red-500' : (level === "MEDIUM" ? 'text-orange-500' : (level === "EASY" ? 'text-green-500' : ''))}`}>{level}</span>
      </div>
      <div className="text-center text-2xl font-bold">
        Score : <span className="text-blue-500">{score}</span>
      </div>
    </div>
  );
};

export default Score;
