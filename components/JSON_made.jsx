import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

// const jsonData = {
//   lines: [
//     {
//       x1: 38,
//       y1: 118,
//       x2: 34,
//       y2: 116,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 34,
//       y1: 116,
//       x2: 47,
//       y2: 121,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 47,
//       y1: 121,
//       x2: 128,
//       y2: 134,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 128,
//       y1: 134,
//       x2: 250,
//       y2: 145,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 250,
//       y1: 145,
//       x2: 369,
//       y2: 161,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 369,
//       y1: 161,
//       x2: 505,
//       y2: 160,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 505,
//       y1: 160,
//       x2: 514,
//       y2: 100,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 514,
//       y1: 100,
//       x2: 514,
//       y2: 16,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 514,
//       y1: 16,
//       x2: 499,
//       y2: 13,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 499,
//       y1: 13,
//       x2: 423,
//       y2: 16,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 423,
//       y1: 16,
//       x2: 369,
//       y2: 23,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 369,
//       y1: 23,
//       x2: 319,
//       y2: 26,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 319,
//       y1: 26,
//       x2: 84,
//       y2: 26,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 84,
//       y1: 26,
//       x2: 37,
//       y2: 20,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 37,
//       y1: 20,
//       x2: 35,
//       y2: 24,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 35,
//       y1: 24,
//       x2: 27,
//       y2: 127,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 73,
//       y1: 127,
//       x2: 68,
//       y2: 117,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 68,
//       y1: 117,
//       x2: 60,
//       y2: 112,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 60,
//       y1: 112,
//       x2: 44,
//       y2: 112,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 44,
//       y1: 112,
//       x2: 31,
//       y2: 125,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 31,
//       y1: 125,
//       x2: 16,
//       y2: 149,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 16,
//       y1: 149,
//       x2: 13,
//       y2: 180,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 13,
//       y1: 180,
//       x2: 22,
//       y2: 196,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 22,
//       y1: 196,
//       x2: 50,
//       y2: 225,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 50,
//       y1: 225,
//       x2: 69,
//       y2: 238,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 69,
//       y1: 238,
//       x2: 88,
//       y2: 243,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 88,
//       y1: 243,
//       x2: 97,
//       y2: 243,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 97,
//       y1: 243,
//       x2: 113,
//       y2: 233,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 113,
//       y1: 233,
//       x2: 123,
//       y2: 217,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 123,
//       y1: 217,
//       x2: 130,
//       y2: 188,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 130,
//       y1: 188,
//       x2: 130,
//       y2: 164,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 130,
//       y1: 164,
//       x2: 128,
//       y2: 158,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 128,
//       y1: 158,
//       x2: 120,
//       y2: 149,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 120,
//       y1: 149,
//       x2: 82,
//       y2: 130,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 82,
//       y1: 130,
//       x2: 90,
//       y2: 130,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 449,
//       y1: 157,
//       x2: 439,
//       y2: 172,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 439,
//       y1: 172,
//       x2: 432,
//       y2: 193,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 432,
//       y1: 193,
//       x2: 432,
//       y2: 220,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 432,
//       y1: 220,
//       x2: 432,
//       y2: 229,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 432,
//       y1: 229,
//       x2: 438,
//       y2: 243,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 438,
//       y1: 243,
//       x2: 445,
//       y2: 252,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 445,
//       y1: 252,
//       x2: 456,
//       y2: 258,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 456,
//       y1: 258,
//       x2: 479,
//       y2: 256,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 479,
//       y1: 256,
//       x2: 492,
//       y2: 246,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 492,
//       y1: 246,
//       x2: 510,
//       y2: 225,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 510,
//       y1: 225,
//       x2: 518,
//       y2: 209,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 518,
//       y1: 209,
//       x2: 516,
//       y2: 191,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 516,
//       y1: 191,
//       x2: 503,
//       y2: 175,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 503,
//       y1: 175,
//       x2: 488,
//       y2: 167,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 488,
//       y1: 167,
//       x2: 468,
//       y2: 163,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 362,
//       y1: 57,
//       x2: 364,
//       y2: 61,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 364,
//       y1: 61,
//       x2: 362,
//       y2: 110,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 362,
//       y1: 110,
//       x2: 393,
//       y2: 111,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 393,
//       y1: 111,
//       x2: 405,
//       y2: 109,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 405,
//       y1: 109,
//       x2: 409,
//       y2: 107,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 409,
//       y1: 107,
//       x2: 409,
//       y2: 103,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 409,
//       y1: 103,
//       x2: 406,
//       y2: 95,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 406,
//       y1: 95,
//       x2: 398,
//       y2: 41,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 398,
//       y1: 41,
//       x2: 388,
//       y2: 46,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 388,
//       y1: 46,
//       x2: 356,
//       y2: 51,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 234,
//       y1: 58,
//       x2: 234,
//       y2: 109,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 234,
//       y1: 109,
//       x2: 239,
//       y2: 112,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 239,
//       y1: 112,
//       x2: 250,
//       y2: 112,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 250,
//       y1: 112,
//       x2: 266,
//       y2: 116,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 266,
//       y1: 116,
//       x2: 270,
//       y2: 116,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 270,
//       y1: 116,
//       x2: 270,
//       y2: 111,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 270,
//       y1: 111,
//       x2: 270,
//       y2: 88,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 270,
//       y1: 88,
//       x2: 266,
//       y2: 61,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 266,
//       y1: 61,
//       x2: 232,
//       y2: 60,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 131,
//       y1: 41,
//       x2: 130,
//       y2: 46,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 130,
//       y1: 46,
//       x2: 132,
//       y2: 96,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 132,
//       y1: 96,
//       x2: 133,
//       y2: 106,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 133,
//       y1: 106,
//       x2: 138,
//       y2: 109,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 138,
//       y1: 109,
//       x2: 159,
//       y2: 109,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 159,
//       y1: 109,
//       x2: 165,
//       y2: 104,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 165,
//       y1: 104,
//       x2: 175,
//       y2: 83,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 175,
//       y1: 83,
//       x2: 178,
//       y2: 65,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 178,
//       y1: 65,
//       x2: 178,
//       y2: 53,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 178,
//       y1: 53,
//       x2: 170,
//       y2: 45,
//       color: "random",
//       thickness: 12,
//     },
//     {
//       x1: 170,
//       y1: 45,
//       x2: 144,
//       y2: 43,
//       color: "random",
//       thickness: 12,
//     },
//   ],
//   mouseUpPoints: [
//     {
//       x: 27,
//       y: 127,
//     },
//     {
//       x: 90,
//       y: 130,
//     },
//     {
//       x: 468,
//       y: 163,
//     },
//     {
//       x: 356,
//       y: 51,
//     },
//     {
//       x: 232,
//       y: 60,
//     },
//     {
//       x: 144,
//       y: 43,
//     },
//   ],
// };

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const animationRequestIdRef = useRef(null);
  const [drawingStarted, setDrawingStarted] = useState(false);
  const animationSpeed = 5; // Adjust the speed of the animation (lower values mean slower animation)
  const [jsonData, setJsonData] = useState("");

  const startDrawing = () => {
    setDrawingStarted(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentIndex = 0;
    let currentPointIndex = 0;

    const drawNextLine = () => {
      if (!drawingStarted || currentIndex >= jsonData.lines.length) {
        cancelAnimationFrame(animationRequestIdRef.current);
        return;
      }

      const line = jsonData.lines[currentIndex];

      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.thickness;
      ctx.stroke();

      currentIndex++;
      animationRequestIdRef.current = requestAnimationFrame(drawNextLine);
    };

    const drawNextPoint = () => {
      if (
        !drawingStarted ||
        currentPointIndex >= jsonData.mouseUpPoints.length
      ) {
        animationRequestIdRef.current = requestAnimationFrame(drawNextLine);
        return;
      }

      const point = jsonData.mouseUpPoints[currentPointIndex];

      ctx.fillStyle = "red"; // Set the color for points
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();

      currentPointIndex++;
      animationRequestIdRef.current = requestAnimationFrame(drawNextPoint);
    };

    // Start the animation
    if (drawingStarted) {
      animationRequestIdRef.current = requestAnimationFrame(drawNextPoint);
    }

    return () => {
      // Clean up on unmount
      cancelAnimationFrame(animationRequestIdRef.current);
    };
  }, [drawingStarted]);

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/generate",
        null,
        { params: { category: "lion.npz" } }
      );
      console.log(response.data["lion"]);

      setJsonData(response.data["lion"][0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={600} />
      <div>
        <button onClick={startDrawing}>Start Drawing</button>
        <button onClick={handleGenerate}>Generate json</button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
