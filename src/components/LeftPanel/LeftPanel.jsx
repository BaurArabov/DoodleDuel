import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useState } from "react";

const LeftPanel = () => {
  const [genText, setGenText] = useState("");
  const [btnContent, setBtnContent] = useState("Generate");
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:8000/generate");
      console.log(response);
      setGenText(response.data);
      setBtnContent("Regenerate");
      // setIsPanelOpen(true); // Open the panel when generate button is clicked
    } catch (error) {
      console.error(error);
    }
  };

  const handleHintClick = () => {
    setIsLoading(true);
    setImageSrc(null);
    axios
      .post("http://localhost:8000/hint")
      .then((response) => {
        console.log(response.data);
        setImageSrc(response.data);
        setIsLoading(false);
        setIsPanelOpen(true); // Open the panel when hint button is clicked
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div
        style={{
          width: "30%",
          position: "fixed",
          borderRadius: "10px",
          padding: "18px",
          margin: "18px",
          left: 0,
          // display: isPanelOpen ? "block" : "none", // Show/hide the panel based on state
          display: "none",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Left Panel</h2>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderBottom: "2px solid #ccc",
                borderRadius: "0",
                outline: "none",
                fontSize: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              placeholder="Enter your interests"
            />
            <Button
              variant="contained"
              color="inherit"
              sx={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontFamily: "Open Sans",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={handleClickGenerate}
            >
              {btnContent}
            </Button>
          </div>

          <div
            style={{ height: "400px", overflow: "auto", marginBottom: "10px" }}
          >
            {genText}
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Generated Image
          </h2>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "10px",
              fontFamily: "Open Sans",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            onClick={handleHintClick}
          >
            HINT
          </Button>

          {isLoading && <CircularProgress color="primary" />}
          {imageSrc && <img src={imageSrc} alt="Generated image" />}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
