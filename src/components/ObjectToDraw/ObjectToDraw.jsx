import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import SketchCanvas from "../SketchCanvas/SketchCanvas";
// import "./ObjectToDraw.css";
import { Button } from "@mui/material";
// import Timer from "../Timer/Timer";
import App from "../../App";
import Winner from "../Winner/Winner";

const ObjectToDraw = ({ currentWord, onStart }) => {
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Track panel open/closed state

  // const handleTogglePanel = () => {
  //   setIsPanelOpen((prevState) => !prevState); // Toggle the panel open/closed state
  // };

  const [category_user, setCategoryUser] = useState("");
  const [category_comp, setCategoryComp] = useState("");

  const [winner, setWinner] = useState("First was");
  const [showModal, setShowModal] = useState(false);

  const [userWins, setUserWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);

  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started
  const [gameOver, setGameOver] = useState(false);

  const [isExit, setExit] = useState(false);

  useEffect(() => {
    // Check for the winner every time the category_user or category_comp changes
    if (category_user === currentWord) {
      setWinner("User");
    } else if (category_comp === currentWord) {
      setWinner("AI");
    }
  }, [category_user, category_comp]);

  useEffect(() => {
    if (userWins === 3) {
      // Show the Winner modal when userWins reaches 3
      setGameOver(true);
      setShowModal(true);

      // Reset the game state here, for example:
      setWinner("User");
    }
  }, [userWins]);

  useEffect(() => {
    if (aiWins === 3) {
      // Show the Winner modal when userWins reaches 3
      setGameOver(true);
      setShowModal(true);
      // Reset the game state here, for example:
      setWinner("Ai");
    }
  }, [aiWins]);

  const handleCloseModal = () => {
    setGameOver(false);
    setShowModal(false);
  };

  const handleTryAgain = () => {
    setAiWins(0);
    setUserWins(0);
    setCategoryComp("");
    setCategoryUser("");
    setShowModal(false);
    setGameOver(false);
    setGameStarted(false);
  };

  const handleStartGame = () => {
    setCategoryUser("");
    setCategoryComp("");
    setGameOver(false);
    setGameStarted(true); // Set the game started state to true
  };

  const handlePause = () => {
    setShowModal(false);
    setGameOver(true);
    setGameStarted(false);
  };

  console.log("is the game started?? " + gameStarted);

  return (
    <>
      {isExit ? (
        <App />
      ) : (
        <div
          className="draw-object"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          {/* <WordSlotMachine
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
          /> */}
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              justifyContent: "space-between",
              padding: "18px",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <Button
                variant="contained"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "2px",
                }}
                onClick={handleStartGame}
              >
                Play
              </Button>
              <Button
                variant="contained"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "2px",
                }}
                onClick={handlePause}
              >
                Pause
              </Button>
            </div>
            {/* <div>{gameStarted ? <Timer /> : <h2>00:30</h2>}</div> */}
            Draw: {currentWord}
            <Button
              variant="contained"
              color="error"
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                border: "2px",
              }}
              onClick={() => {
                setExit(true);
              }}
            >
              Exit
            </Button>
          </div>

          {showModal && winner && (
            <Winner
              winner={winner}
              onClose={handleCloseModal}
              onTryAgain={handleTryAgain}
            />
          )}
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                width: "100vw",
                justifyContent: "space-between",
              }}
            >
              <Canvas
                category_user={category_user}
                setCategoryUser={setCategoryUser}
                currentWord={currentWord}
                setUserWins={setUserWins}
                gameOver={gameOver}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "35px" }}>{winner}</div>
                  <div style={{ fontSize: "80px" }}>
                    {userWins}:{aiWins}
                  </div>
                </div>
              </div>
              <SketchCanvas
                currentWord={currentWord}
                category_comp={category_comp}
                setCategoryComp={setCategoryComp}
                gameStarted={gameStarted}
                gameOver={gameOver}
                setGameStarted={setGameStarted}
                setAiWins={setAiWins}
                aiWins={aiWins}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ObjectToDraw;
