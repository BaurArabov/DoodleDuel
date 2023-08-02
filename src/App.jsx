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
      }}
    >
      {gameStarted ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <ObjectToDraw /> */}
          <WordSlotMachine />
        </div>
      ) : (
        <StartPage onStart={startGame} />
      )}
      {/* <DrawingCanvas /> */}
    </div>
  );
};

export default App;
