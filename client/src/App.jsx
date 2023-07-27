import React, { useState } from "react";
// import DrawingCanvas from "../components/JSON_made";
import ObjectToDraw from "../components/ObjectToDraw/ObjectToDraw";
import StartPage from "../components/StartPage/StartPage";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [objectToDraw, setObjectToDraw] = useState("");

  const startGame = () => {
    // Simulate fetching a random object to draw
    const objects = ["cat", "tree", "house", "car"];
    const randomIndex = Math.floor(Math.random() * objects.length);
    const randomObject = objects[randomIndex];
    setObjectToDraw(randomObject);
    setGameStarted(true);
  };

  return (
    <div>
      {gameStarted ? (
        <ObjectToDraw object={objectToDraw} />
      ) : (
        <StartPage onStart={startGame} />
      )}
      {/* <DrawingCanvas /> */}
    </div>
  );
};

export default App;
