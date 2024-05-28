import React, { useState, useEffect } from "react";
import HomeImage from "../assets/Home_image.png";

interface LeaderboardEntry {
  username: string;
  wallet: string;
  level: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:8000/leaderboard");
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  return (
    <div
      className="w-screen h-screen justify-center items-center flex flex-col"
      style={{
        // backgroundImage: `url(${HomeImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        // backgroundColor: "#82A405",
        backgroundPosition: "center",
        backgroundColor: "#82A405",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Wallet</th>
            <th className="border border-gray-300 px-4 py-2">Level</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry: LeaderboardEntry, index: number) => (
            <tr key={index} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">{entry.username}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.wallet}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.level}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
