import React, { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import SketchCanvas from "../SketchCanvas/SketchCanvas";
import Winner from "../Winner/Winner";
// import "./ObjectToDraw.css";

const ObjectToDraw = ({ currentWord }) => {
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Track panel open/closed state

  // const handleTogglePanel = () => {
  //   setIsPanelOpen((prevState) => !prevState); // Toggle the panel open/closed state
  // };

  const [category_user, setCategoryUser] = useState("");
  const [category_comp, setCategoryComp] = useState("");

  const [winner, setWinner] = useState("");

  useEffect(() => {
    // Check for the winner every time the category_user or category_comp changes
    if (category_user === currentWord) {
      setWinner("User");
    } else if (category_comp === currentWord) {
      setWinner("AI");
    }
  }, [category_user, category_comp, currentWord]);

  return (
    <div>
      {/* <LeftPanel /> */}
      {/* <Button
        variant="contained"
        color="inherit"
        sx={{
          position: "absolute",
          padding: "5px 5px",
          borderRadius: "10px",
          fontFamily: "Open Sans",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        onClick={handleTogglePanel}
      >
        {isPanelOpen ? "Close Panel" : "Open Panel"}
      </Button> */}

      <div
        className="draw-object"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          margin: "18px",
        }}
      >
        {/* <WordSlotMachine
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
          /> */}
        <div style={{ fontSize: "30px" }}>Draw: {currentWord}</div>
        {winner && <Winner winner={winner} />}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Canvas
            category_user={category_user}
            setCategoryUser={setCategoryUser}
          />

          <SketchCanvas
            currentWord={currentWord}
            category_comp={category_comp}
            setCategoryComp={setCategoryComp}
          />
        </div>
      </div>
    </div>
  );
};

export default ObjectToDraw;
