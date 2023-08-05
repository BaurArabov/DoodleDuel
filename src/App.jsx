import React, { useState } from "react";
import StartPage from "./components/StartPage/StartPage";
import WordSlotMachine from "./components/WordSlotMachine/WordSlotMachine";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        backgroundColor: "#f48e2a",
      }}
    >
      {gameStarted ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WordSlotMachine onStart={startGame} />
        </div>
      ) : (
        <StartPage onStart={startGame} />
      )}
    </div>
  );
};

export default App;
