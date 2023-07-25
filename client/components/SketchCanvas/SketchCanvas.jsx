import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const SketchCanvas = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [drawingData, setDrawingData] = useState(null);
  const [category, setCategory] = useState(null);
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the sketch based on the provided coordinates
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";

    let currentCoordinatesIndex = 0;

    const animateDrawing = () => {
      if (currentCoordinatesIndex < coordinates.length) {
        const [x, y] = coordinates[currentCoordinatesIndex];
        if (currentCoordinatesIndex === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        currentCoordinatesIndex++;
        setTimeout(animateDrawing, 50); // Add a delay of 50 milliseconds between each coordinate drawing

        // handleClassify();
      } else {
        setDrawing(false);
      }
    };

    if (drawing) {
      animateDrawing();
    }
  }, [coordinates, drawing]);

  const startDrawing = () => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas when "Start Drawing" button is clicked
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
      setSmthOnCanvas(false);
      if (!isThereSmthOnCanvas) alert("Draw something");
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

  const handleClassify = async () => {
    const drawingData = getDataURL(); // Call the getDataURL function to get the URL before sending the request
    // console.log("url of the image" + drawingData);
    try {
      const response = await axios.post(
        "http://localhost:8000/recognizee",
        null,
        {
          params: {
            image_data_url: drawingData,
          },
        }
      );
      console.log(response.data);
      setCategory(response.data.predicted_class); // Assuming the response contains a "predicted_class" field
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:8000/generate");
      console.log(response.data.bus[0]);
      setCoordinates(response.data.train[1]);
    } catch (error) {
      console.error(error);
    }
  };

  const getHeight = window.outerHeight * 0.5;
  const getWidth = window.outerWidth * 0.48;

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
      <div style={{ marginRight: "20px" }}>
        <canvas
          ref={canvasRef}
          width={getWidth}
          height={getHeight}
          style={{
            width: { getWidth },
            border: "3px solid black",
            borderRadius: "15px",
          }}
        />
      </div>
      <button onClick={startDrawing}>Start Drawing</button>
      <button onClick={handleClassify}>Classify</button>
      <button onClick={handleGenerate}>Geneerate</button>
      {category && <p>Predicted Category: {category}</p>}
    </div>
  );
};

export default SketchCanvas;
