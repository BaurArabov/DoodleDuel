import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const SketchCanvas = ({
  currentWord,
  category_comp,
  setCategoryComp,
  gameStarted,
  setGameStarted,
  setAiWins,
  aiWins,
  gameOver,
}) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [drawingData, setDrawingData] = useState(null);

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let currentIndex = 0;
    let currentPointIndex = 0;

    const drawNextLine = () => {
      if (!drawing || currentIndex >= jsonData.lines.length) {
        setDrawing(false);
        handleClassify();

        return;
      }

      const line = jsonData.lines[currentIndex];

      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 5;
      ctx.stroke();

      currentIndex++;
      // requestAnimationFrame(drawNextLine);
      setTimeout(drawNextLine, 30);
    };

    const drawNextPoint = () => {
      if (!drawing || currentPointIndex >= jsonData.mouseUpPoints.length) {
        requestAnimationFrame(drawNextLine);
        return;
      }

      const point = jsonData.mouseUpPoints[currentPointIndex];

      ctx.fillStyle = "red"; // Set the color for points
      ctx.beginPath();

      //points || without points
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();

      currentPointIndex++;
      requestAnimationFrame(drawNextPoint);
    };

    // Start the animation when drawing is true and jsonData is available
    if (drawing && jsonData) {
      requestAnimationFrame(drawNextPoint);
    }
  }, [jsonData, drawing]);

  useEffect(() => {
    if (gameOver) {
      setDrawing(false);
      // clearCanvas();
    } else if (gameStarted) {
      if (aiWins < 3) {
        // Check if wins are less than 3
        handleGenerate();
        setTimeout(() => {
          startDrawing();
        }, 1000);
      }
    }
  }, [gameStarted, aiWins, category_comp]);

  const startDrawing = () => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas when "Start Drawing" button is clicked
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/generate",
        null,
        { params: { category: currentWord + ".npz" } }
      );
      const rnd = Math.floor(Math.random() * 100);
      console.log(rnd);
      console.log(response.data[currentWord][rnd]);
      setJsonData(response.data[currentWord][rnd]);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataURL = () => {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");

    if (!canvasElement) {
      console.error("Canvas element not found.");
      return;
    }

    if (!canvasContext) {
      console.error("Could not get canvas context.");
      return;
    }

    if (
      canvasContext
        .getImageData(0, 0, canvasElement.width, canvasElement.height)
        .data.every((pixel) => pixel === 0)
    ) {
      return;
    }

    // Create a new canvas with white background
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvasElement.width;
    newCanvas.height = canvasElement.height;
    const newCanvasContext = newCanvas.getContext("2d");
    newCanvasContext.fillStyle = "white";
    newCanvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw the original canvas on the new canvas
    newCanvasContext.drawImage(canvasElement, 0, 0);

    // Convert the new canvas to a data URL with image/jpeg format
    const dataURL = newCanvas.toDataURL("image/jpeg");
    console.log(dataURL);
    setDrawingData(dataURL);
    return dataURL;
  };

  function clearCanvas() {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }

  const handleClassify = async () => {
    const imageURL = getDataURL(); // Call the getDataURL function to get the URL before sending the request
    // console.log("url of the image" + drawingData);
    try {
      const response = await axios.post(
        "http://localhost:8000/recognizee",
        null,
        {
          params: {
            image_data_url: imageURL,
          },
        }
      );
      console.log(response.data);
      setCategoryComp(response.data.predicted_class); // Assuming the response contains a "predicted_class" field

      if (response.data.predicted_class === currentWord) {
        clearCanvas();
        setCategoryComp("");
        setAiWins((prevWins) => prevWins + 1);
      }
      if (
        currentWord === "bus" &&
        response.data.predicted_class === "firetruck"
      ) {
        clearCanvas();
        setCategoryComp("");
        setAiWins((prevWins) => prevWins + 1);
      }
      if (
        currentWord === "train" &&
        response.data.predicted_class === "toothbrush"
      ) {
        clearCanvas();
        setCategoryComp("");
        setAiWins((prevWins) => prevWins + 1);
      }
      if (currentWord === "apple" && response.data.predicted_class === "pear") {
        clearCanvas();
        setCategoryComp("");
        setAiWins((prevWins) => prevWins + 1);
      }
      if (currentWord === "lion" && response.data.predicted_class === "sun") {
        clearCanvas();
        setCategoryComp("");
        setAiWins((prevWins) => prevWins + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getHeight = window.outerHeight * 0.5;
  const getWidth = window.outerWidth * 0.43;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      <p
        style={{
          fontFamily: "Open Sans",
          fontSize: "30px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        AI
      </p>
      <div style={{ margin: "20px" }}>
        <canvas
          ref={canvasRef}
          width={getWidth}
          height={getHeight}
          style={{
            width: { getWidth },
            border: `3px solid black`,
            borderRadius: "15px",
            backgroundColor: "#fff",
          }}
        />
      </div>
      {/* <button onClick={startDrawing}>Start Drawing</button>
      <button onClick={handleClassify}>Classify</button>
      <button onClick={handleGenerate}>Geneerate</button> */}
      {category_comp && <p>Predicted Category: {category_comp}</p>}
      {/* <img src={`${drawingData}`} alt="" /> */}
    </div>
  );
};

export default SketchCanvas;
