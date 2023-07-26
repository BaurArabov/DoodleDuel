import React, { useState } from "react";
import Canvas from "../Canvas/Canvas";
import LeftPanel from "../LeftPanel/LeftPanel";
import SketchCanvas from "../SketchCanvas/SketchCanvas";
import WordSlotMachine from "../WordSlotMachine/WordSlotMachine";
import "./ObjectToDraw.css";

const ObjectToDraw = ({ object }) => {
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Track panel open/closed state

  // const handleTogglePanel = () => {
  //   setIsPanelOpen((prevState) => !prevState); // Toggle the panel open/closed state
  // };

  const [currentWord, setCurrentWord] = useState("Ready to Spin!");

  const [category_user, setCategoryUser] = useState("");
  const [category_comp, setCategoryComp] = useState("");

  const [isPlay, setPlay] = useState(false);

  return (
    <div>
      <LeftPanel />
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
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: isPanelOpen ? "flex-end" : "center", // Center align the canvas when the panel is closed
          alignItems: "center",
        }}
      >
        <div
          className="draw-object"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            margin: "18px",
          }}
        >
          {/* <h3 style={{ margin: "0" }}>Draw: {object}</h3> */}
          <WordSlotMachine
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Canvas
              category_user={category_user}
              setCategoryUser={setCategoryUser}
            />

            {category_user === currentWord && "User Won"}

            <SketchCanvas
              currentWord={currentWord}
              category_comp={category_comp}
              setCategoryComp={setCategoryComp}
            />
            {category_comp === currentWord && "AI Won"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectToDraw;
