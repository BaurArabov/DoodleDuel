import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import SketchCanvas from "../SketchCanvas/SketchCanvas";
// import "./ObjectToDraw.css";
import { Button } from "@mui/material";
import Timer from "../Timer/Timer";
import Winner from "../Winner/Winner";

const ObjectToDraw = ({ currentWord }) => {
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Track panel open/closed state

  // const handleTogglePanel = () => {
  //   setIsPanelOpen((prevState) => !prevState); // Toggle the panel open/closed state
  // };

  const [category_user, setCategoryUser] = useState("");
  const [category_comp, setCategoryComp] = useState("");

  const [winner, setWinner] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [userWins, setUserWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);

  useEffect(() => {
    // Check for the winner every time the category_user or category_comp changes
    if (category_user === currentWord) {
      setWinner("User");
      setUserWins((prevWins) => prevWins + 1); // Increment User wins count
      setShowModal(true);
    } else if (category_comp === currentWord) {
      setWinner("AI");
      setAiWins((prevWins) => prevWins + 1); // Increment AI wins count
      setShowModal(true);
    }
  }, [category_user, category_comp, currentWord]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="draw-object"
      style={{
        display: "flex",
        flexDirection: "column",
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
          justifyContent: "space-around",
        }}
      >
        Draw: {currentWord}
        <Timer />
        <Button variant="contained">Play</Button>
      </div>

      {showModal && <Winner winner={winner} onClose={handleCloseModal} />}
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
            disabled={showModal}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "80px" }}>
              {userWins}:{aiWins}
            </div>
          </div>
          <SketchCanvas
            currentWord={currentWord}
            category_comp={category_comp}
            setCategoryComp={setCategoryComp}
            disabled={showModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ObjectToDraw;
