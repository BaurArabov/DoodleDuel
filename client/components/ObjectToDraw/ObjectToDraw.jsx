import Button from "@mui/material/Button";
import React, { useState } from "react";
import Canvas from "../Canvas/Canvas";
import LeftPanel from "../LeftPanel/LeftPanel";
import "./ObjectToDraw.css";

const ObjectToDraw = ({ object }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Track panel open/closed state

  const handleTogglePanel = () => {
    setIsPanelOpen((prevState) => !prevState); // Toggle the panel open/closed state
  };

  return (
    <div>
      <LeftPanel isPanelOpen={isPanelOpen} />
      <Button
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
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isPanelOpen ? "flex-end" : "center", // Center align the canvas when the panel is closed
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
          <h3>Draw: {object}</h3>
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default ObjectToDraw;
