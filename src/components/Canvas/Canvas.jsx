import { Button, Slider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#FFF",
    },
  },
});

const Canvas = ({
  category_user,
  setCategoryUser,
  isUserWon,
  setUserWins,
  currentWord,
  gameOver,
}) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef(null);
  const historyRef = useRef([]);

  const [isThereImage, setThereImage] = useState(false);
  const [drawingData, setDrawingData] = useState("");
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState("#000");

  const [isDrawingInProgress, setDrawingInProgress] = useState(false);

  function setCanvasRef(ref) {
    canvasRef.current = ref;
  }

  function onCanvasMouseDown(e) {
    if (gameOver) return;
    isDrawingRef.current = true;
    prevPointRef.current = null;
    historyRef.current.push([]);
  }

  function onDraw(canvasContext, point, prevPoint, width) {
    drawLine(prevPoint, point, canvasContext, brushSize);

    const currentLine = historyRef.current[historyRef.current.length - 1];
    currentLine.push({ x: point.x, y: point.y });

    setDrawingInProgress(true);
  }

  function clearCanvas() {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    setThereImage(false);

    historyRef.current = [];
  }

  function updateClearForUndo() {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    setThereImage(false);
  }

  function undoLastChange() {
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");

    updateClearForUndo();

    historyRef.current.pop();

    historyRef.current.forEach((line) => {
      line.forEach((point, index) => {
        if (index === 0) {
          canvasContext.beginPath();
          canvasContext.moveTo(point.x, point.y);
        } else {
          canvasContext.lineTo(point.x, point.y);
        }
      });
      canvasContext.stroke();
    });
  }

  function drawLine(start, end, canvasContext, width) {
    start = start ?? end;
    canvasContext.beginPath();
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;

    canvasContext.lineCap = "round";
    canvasContext.lineJoin = "round";

    canvasContext.moveTo(start.x, start.y);
    canvasContext.lineTo(end.x, end.y);
    canvasContext.stroke();

    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(start.x, start.y, width / 2, 0, 2 * Math.PI);
    canvasContext.fill();
  }

  useEffect(() => {
    function computePointInCanvas(clientX, clientY) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    }

    function handleTouchMove(e) {
      e.preventDefault();
      if (isDrawingRef.current && canvasRef.current) {
        const touch = e.touches[0];
        const point = computePointInCanvas(touch.clientX, touch.clientY);
        const canvasContext = canvasRef.current.getContext("2d");
        if (onDraw) onDraw(canvasContext, point, prevPointRef.current);
        prevPointRef.current = point;
      }
    }

    function handleTouchEnd() {
      // handleClassify();

      setDrawingInProgress(false);

      isDrawingRef.current = false;
      prevPointRef.current = null;
    }

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onDraw]);

  useEffect(() => {
    clearCanvas();
    setDrawingData(null);
  }, [isUserWon]);

  useEffect(() => {
    if (isDrawingInProgress) {
      // handleClassify();
    }
  }, [isDrawingInProgress]);

  useEffect(() => {
    function computePointInCanvas(clientX, clientY) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    }

    function handleMouseMove(e) {
      if (gameOver) return;
      if (isDrawingRef.current && canvasRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const canvasContext = canvasRef.current.getContext("2d");
        if (onDraw) onDraw(canvasContext, point, prevPointRef.current);
        prevPointRef.current = point;
      }
    }

    function handleMouseUp() {
      if (gameOver) return;
      getDataURL();
      handleClassify();

      // Set drawing in progress to false
      setDrawingInProgress(false);

      isDrawingRef.current = false;
      prevPointRef.current = null;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onDraw]);

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
    setThereImage(true);
  };

  const handleImageUpload = (imageDataURL) => {
    // Set the uploaded image to the canvas or perform other operations
    // You can access the imageDataURL here and manipulate it as needed
    // For example, you can create a new image element and draw it on the canvas
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext("2d");

    const img = new Image();
    img.src = imageDataURL;

    img.onload = () => {
      // Adjust the opacity of the image using globalAlpha
      canvasContext.globalAlpha = 0.5; // Set the desired opacity value

      // Draw the image on the canvas
      canvasContext.drawImage(img, 0, 0);

      // Reset the globalAlpha if needed
      canvasContext.globalAlpha = 1.0;
    };
  };

  // const getHeight = window.outerHeight * 0.6;
  // const getWidth = window.outerWidth * 0.55;

  const getHeight = window.outerHeight * 0.5;
  const getWidth = window.outerWidth * 0.43;

  const handleClassify = async () => {
    console.log("url of the image" + drawingData);
    try {
      const response = await axios.post(
        "https://draw-with-ai.onrender.com/recognize",
        null,
        {
          params: {
            image_data_url: drawingData,
          },
        }
      );
      console.log(response.data);
      setCategoryUser(response.data.predicted_class); // Assuming the response contains a "predicted_class" field
      // setTimeout(() => {
      //   setCategoryUser("");
      // }, 1000);
      if (response.data.predicted_class === currentWord) {
        clearCanvas();
        setCategoryUser("");
        setUserWins((prevWins) => prevWins + 1);
        setDrawingData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          User
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "20px" }}>
            <canvas
              id="responsive-canvas"
              width={getWidth}
              height={getHeight}
              onTouchStart={onCanvasMouseDown}
              onTouchMove={onCanvasMouseDown}
              onMouseDown={onCanvasMouseDown}
              style={{
                width: { getWidth },
                border: "3px solid black",
                borderRadius: "15px",
                backgroundColor: "#fff",
              }}
              ref={setCanvasRef}
            />
          </div>

          <div>
            <div style={{ display: "flex", width: "300px" }}>
              <Button
                variant="text"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "2px",
                }}
                onClick={undoLastChange}
              >
                Undo
              </Button>
              <Button
                variant="text"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
                onClick={clearCanvas}
              >
                Clear
              </Button>
              {/* 
              <Button
                variant="text"
                onClick={getDataURL}
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Get image
              </Button>
              <Button
                variant="text"
                onClick={handleClassify}
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "red",
                }}
              >
                Classsify
              </Button> */}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              />

              <Slider
                sx={{ marginLeft: "10px" }}
                aria-label="Temperature"
                defaultValue={5}
                valueLabelDisplay="auto"
                onChange={(e) => setBrushSize(Number(e.target.value))}
                step={5}
                marks
                min={5}
                max={100}
              />
            </div>
          </div>
        </div>
        <div style={{}}>
          {/* Add the ImageUploader component */}
          {category_user && <p>Predicted Category: {category_user}</p>}
          {/* <ImageUploader onImageUpload={handleImageUpload} /> */}
        </div>
        {/* {isThereImage && <img src={`${drawingData}`} alt="" />} */}
      </div>
    </ThemeProvider>
  );
};

export default Canvas;

// import { Button, Slider } from "@mui/material";
// import { ThemeProvider, createMuiTheme } from "@mui/material/styles";
// import { useEffect, useRef, useState } from "react";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#000", // Change the primary color
//     },
//     secondary: {
//       main: "#FFF", // Change the secondary color
//     },
//   },
// });

// function Canvas() {
//   const canvasRef = useRef(null);
//   const isDrawingRef = useRef(false);
//   const prevPointRef = useRef(null);
//   const historyRef = useRef([]);

//   const [isThereImage, setThereImage] = useState(false);
//   const [drawingData, setDrawingData] = useState("");
//   const [brushSize, setBrushSize] = useState(5);
//   const [color, setColor] = useState("#000");

//   function setCanvasRef(ref) {
//     canvasRef.current = ref;
//   }

//   function onCanvasMouseDown(e) {
//     isDrawingRef.current = true;
//   }

//   function onDraw(canvasContext, point, prevPoint, width) {
//     drawLine(prevPoint, point, canvasContext, brushSize);

//     saveAction({ type: "draw", point, prevPoint, width });
//   }

//   function saveAction(action) {
//     historyRef.current.push(action);
//   }

//   function clearCanvas() {
//     const canvasElement = canvasRef.current;
//     const canvasContext = canvasElement.getContext("2d");
//     canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
//     setThereImage(false);
//     // historyRef.current = [];
//   }

//   function undoLastChange() {
//     const canvasElement = canvasRef.current;
//     const canvasContext = canvasElement.getContext("2d");

//     clearCanvas();
//     console.log(historyRef.current);

//     const lastAction = historyRef.current.pop();

//     if (lastAction) {
//       historyRef.current.forEach((action) => {
//         if (action.type === "draw") {
//           console.log(action);
//           if (action.prevPoint === null) {
//             action.prevPoint = action.point;
//           }
//           drawLine(action.prevPoint, action.point, canvasContext, "#000", 5);
//         }
//       });
//     }
//   }

//   function drawLine(start, end, canvasContext, width) {
//     start = start ?? end;
//     canvasContext.beginPath();
//     canvasContext.lineWidth = width;
//     canvasContext.strokeStyle = color;

//     canvasContext.lineCap = "round";
//     canvasContext.lineJoin = "round";

//     canvasContext.moveTo(start.x, start.y);
//     canvasContext.lineTo(end.x, end.y);
//     canvasContext.stroke();

//     canvasContext.fillStyle = color;
//     canvasContext.beginPath();
//     canvasContext.arc(start.x, start.y, width / 2, 0, 2 * Math.PI);
//     canvasContext.fill();
//   }

//   useEffect(() => {
//     function computePointInCanvas(clientX, clientY) {
//       const boundingRect = canvasRef.current.getBoundingClientRect();
//       return {
//         x: clientX - boundingRect.left,
//         y: clientY - boundingRect.top,
//       };
//     }

//     function handleTouchMove(e) {
//       e.preventDefault();
//       if (isDrawingRef.current && canvasRef.current) {
//         const touch = e.touches[0];
//         const point = computePointInCanvas(touch.clientX, touch.clientY);
//         const canvasContext = canvasRef.current.getContext("2d");
//         if (onDraw) onDraw(canvasContext, point, prevPointRef.current);
//         prevPointRef.current = point;
//       }
//     }

//     function handleTouchEnd() {
//       isDrawingRef.current = false;
//       prevPointRef.current = null;
//     }

//     window.addEventListener("touchmove", handleTouchMove, { passive: false });
//     window.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       window.removeEventListener("touchmove", handleTouchMove, {
//         passive: false,
//       });
//       window.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [onDraw]);

//   useEffect(() => {
//     function computePointInCanvas(clientX, clientY) {
//       const boundingRect = canvasRef.current.getBoundingClientRect();
//       return {
//         x: clientX - boundingRect.left,
//         y: clientY - boundingRect.top,
//       };
//     }

//     function handleMouseMove(e) {
//       if (isDrawingRef.current && canvasRef.current) {
//         const point = computePointInCanvas(e.clientX, e.clientY);
//         const canvasContext = canvasRef.current.getContext("2d");
//         if (onDraw) onDraw(canvasContext, point, prevPointRef.current);
//         prevPointRef.current = point;
//       }
//     }

//     function handleMouseUp() {
//       isDrawingRef.current = false;
//       prevPointRef.current = null;
//     }

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [onDraw]);

//   const getDataURL = () => {
//     const canvasElement = canvasRef.current;
//     const canvasContext = canvasElement.getContext("2d");

//     if (!canvasElement) {
//       console.error("Canvas element not found.");
//       return;
//     }

//     if (!canvasContext) {
//       console.error("Could not get canvas context.");
//       return;
//     }

//     if (
//       canvasContext
//         .getImageData(0, 0, canvasElement.width, canvasElement.height)
//         .data.every((pixel) => pixel === 0)
//     ) {
//       alert("draw something");
//       return;
//     }
//     setDrawingData(canvasElement.toDataURL("image/png"));

//     setThereImage(true);
//   };
//   console.log(drawingData);

//   const getHeight = window.outerHeight * 0.6;
//   const getWidth = window.outerWidth * 0.55;

//   return (
//     <ThemeProvider theme={theme}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           paddingTop: "80px",
//         }}
//       >
//         <p
//           style={{
//             fontFamily: "Open Sans",
//             fontSize: "30px",
//             color: "#333",
//             fontWeight: "bold",
//           }}
//         >
//           Canvas
//         </p>

//         <div style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ marginRight: "20px" }}>
//             <canvas
//               id="responsive-canvas"
//               width={getWidth}
//               height={getHeight}
//               onTouchStart={onCanvasMouseDown}
//               onTouchMove={onCanvasMouseDown}
//               onMouseDown={onCanvasMouseDown}
//               style={{
//                 width: { getWidth },
//                 border: "3px solid black",
//                 borderRadius: "15px",
//               }}
//               ref={setCanvasRef}
//             />
//           </div>

//           <div>
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Button
//                   variant="text"
//                   style={{
//                     marginBottom: "10px",
//                     fontWeight: "bold",
//                     fontSize: "18px",
//                   }}
//                   onClick={undoLastChange}
//                 >
//                   Undo
//                 </Button>
//                 <Button
//                   variant="text"
//                   style={{
//                     marginBottom: "10px",
//                     fontWeight: "bold",
//                     fontSize: "18px",
//                   }}
//                   onClick={clearCanvas}
//                 >
//                   Clear
//                 </Button>
//               </div>

//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <input
//                   type="color"
//                   value={color}
//                   onChange={(e) => setColor(e.target.value)}
//                   style={{
//                     border: "2px solid #ccc",
//                     borderRadius: "5px",
//                     padding: "3px",
//                   }}
//                 />

//                 <Slider
//                   sx={{ height: 300, marginLeft: "10px" }}
//                   orientation="vertical"
//                   aria-label="Temperature"
//                   defaultValue={5}
//                   valueLabelDisplay="auto"
//                   onChange={(e) => setBrushSize(Number(e.target.value))}
//                   step={5}
//                   marks
//                   min={5}
//                   max={100}
//                 />
//               </div>

//               <div style={{ marginTop: "10px" }}>
//                 <Button
//                   variant="text"
//                   onClick={getDataURL}
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "18px",
//                   }}
//                 >
//                   Get image
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {isThereImage && <img src={`${drawingData}`} alt="" />}
//       </div>
//     </ThemeProvider>
//   );
// }

// export default Canvas;

{
  //canvas + buttons (old)
  /* <div
        style={{
          display: "flex",
        }}
      >
        <canvas
          id="responsive-canvas"
          width={getWidth}
          height={getHeight}
          onTouchStart={onCanvasMouseDown}
          onTouchMove={onCanvasMouseDown}
          onMouseDown={onCanvasMouseDown}
          style={{
            width: { getWidth },
            border: "3px solid black",
            borderRadius: "15px",
          }}
          ref={setCanvasRef}
        />

        <div>
          <div>
            <button onClick={undoLastChange}>Undo</button>

            <button onClick={clearCanvas}>Clear</button>

            <button onClick={getDataURL}>Get image</button>
          </div>

          <div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Slider
              sx={{ height: 300 }}
              orientation="vertical"
              // color="primary"
              aria-label="Temperature"
              defaultValue={5}
              valueLabelDisplay="auto"
              onChange={(e) => setBrushSize(Number(e.target.value))}
              step={5}
              marks
              min={5}
              max={100}
            />
          </div>
        </div>
      </div> */
}
