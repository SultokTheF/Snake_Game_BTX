import { useState } from "react";
import HomeImage from "../assets/Home_image.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGameLevel, setUserWallet } from "../Redux/Slices/gameSlices"; // Import setUserWallet action

import { ethers } from "ethers";

const Home = () => {
  const navigate = useNavigate();
  const [movePage, setMovePage] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userWallet = useSelector((state: any) => state.game.userWallet);

  const btnHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: string[]) => {
          dispatch(setUserWallet(res[0]));
        })
        .catch((error: Error) => console.error("Error connecting wallet:", error));
    } else {
      alert("Install Metamask extension!!");
    }
  };

  const handleLevelChange = (level: number) => {
    dispatch(setGameLevel({ level, wallet: userWallet })); // Dispatch setGameLevel action with level and userWallet
    setMovePage(true);

    setTimeout(() => {
      navigate("/game");
    }, 1000);
  };

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${HomeImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#82A405",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="flex h-full justify-center items-center">
        <div className="text-center">
          {userWallet ? (
            <h1>Hello! <span className="text-blue-500">{userWallet}</span> </h1>
          ) : (
            <button
              className="rounded p-3 mb-3 bg-black text-white hover:bg-gray-800"
              onClick={btnHandler}
            >
              Connect Wallet
            </button>
          )}

          <h3 className="text-[1.5rem] text-[black] font-bold mb-4">
            {movePage ? "Wait..." : "Select Level"}
          </h3>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => handleLevelChange(300)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Easy
            </button>
            <button
              onClick={() => handleLevelChange(200)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Medium
            </button>
            <button
              onClick={() => handleLevelChange(100)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Hard
            </button>
          </div>

          <a href="/leaderboard">Leaderboard</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
