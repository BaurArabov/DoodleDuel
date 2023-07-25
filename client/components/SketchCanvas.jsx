import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const SketchCanvas = ({ coordinates }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [drawingData, setDrawingData] = useState(null);
  const [category, setCategory] = useState(null);

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
    console.log("url of the image" + drawingData);
    try {
      const response = await axios.post(
        "http://localhost:8000/recognize",
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
      console.log(response.data);
      // Assuming the response contains a "category" field and the data is structured as { "category_name": [coordinates] }
      const category = response.data["category_name"];
      setCategory(category);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={512} // Set the canvas size to match the sketch size
        height={512}
        style={{ border: "1px solid black" }}
      />
      <button onClick={startDrawing}>Start Drawing</button>
      <button onClick={handleClassify}>Classify</button>
      <button onClick={handleGenerate}>Geneerate</button>
    </div>
  );
};

export default SketchCanvas;
