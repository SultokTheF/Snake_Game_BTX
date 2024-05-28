import React, { useState } from "react";

interface GameOverModalProps {
  restartGame: () => void;
  userWallet: string | null;
  mode: string;
  score: number;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  restartGame,
  userWallet,
  mode,
  score,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    userWallet: userWallet,
    mode: mode,
    score: score,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      wallet: formData.userWallet,
      level: formData.mode,
      score: formData.score
    };
    // Call your leaderboard API here to post the data
    fetch("http://localhost:8000/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.error || "Score submitted successfully");
        restartGame();
        // Perform any necessary actions after posting leaderboard data
      })
      .catch((error) => {
        console.error("Error posting leaderboard entry:", error);
        // Handle errors if needed
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white text-gray-500 p-8 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Game Over!</h2>
        <p className="text-lg mb-4">Do you want to share your score?</p>
        <form onSubmit={handleSubmit} className="w-[500px]">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-left">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              // placeholder="Enter your username"
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userWallet" className="block text-gray-700 text-left">
              Wallet:
            </label>
            <input
              type="userWallet"
              id="userWallet"
              name="userWallet"
              value={formData.userWallet || ""}
              onChange={handleChange}
              required
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mode" className="block text-gray-700 text-left">
              Level:
            </label>
            <input
              type="text"
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="score" className="block text-gray-700 text-left">
              Score:
            </label>
            <input
              type="number"
              id="score"
              name="score"
              value={formData.score}
              onChange={handleChange}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-5"
          >
            Submit
          </button>
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Restart
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameOverModal;
