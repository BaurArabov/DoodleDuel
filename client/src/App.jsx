// import React, { useState } from "react";
// import ObjectToDraw from "../components/ObjectToDraw/ObjectToDraw";
// import StartPage from "../components/StartPage/StartPage";

// const App = () => {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [objectToDraw, setObjectToDraw] = useState("");

//   const startGame = () => {
//     // Simulate fetching a random object to draw
//     const objects = ["cat", "tree", "house", "car"];
//     const randomIndex = Math.floor(Math.random() * objects.length);
//     const randomObject = objects[randomIndex];
//     setObjectToDraw(randomObject);
//     setGameStarted(true);
//   };

//   return (
//     <div>
//       {gameStarted ? (
//         <ObjectToDraw object={objectToDraw} />
//       ) : (
//         <StartPage onStart={startGame} />
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import SketchCanvas from "../components/SketchCanvas";

const App = () => {
  // Replace this with the actual coordinates from the JSON file
  const [coordinates, setCoordinates] = useState([
    [22, 92],
    [19, 90],
    [30, 94],
    [101, 105],
    [208, 115],
    [312, 129],
    [431, 128],
    [439, 75],
    [439, 2],
    [426, 0],
    [360, 2],
    [312, 8],
    [268, 10],
    [62, 10],
    [21, 5],
    [19, 8],
    [52, 98],
    [47, 90],
    [40, 85],
    [26, 85],
    [15, 96],
    [2, 117],
    [0, 144],
    [8, 158],
    [33, 183],
    [50, 194],
    [67, 198],
    [75, 198],
    [89, 190],
    [98, 176],
    [104, 151],
    [104, 130],
    [102, 125],
    [95, 117],
    [62, 100],
    [383, 124],
    [374, 137],
    [368, 155],
    [368, 179],
    [368, 187],
    [373, 199],
    [379, 207],
    [389, 212],
    [409, 210],
    [420, 202],
    [436, 184],
    [443, 170],
    [441, 154],
    [430, 140],
    [417, 133],
    [307, 37],
    [309, 40],
    [307, 83],
    [334, 84],
    [345, 82],
    [348, 80],
    [348, 77],
    [346, 70],
    [339, 22],
    [331, 26],
    [196, 36],
    [196, 81],
    [200, 83],
    [210, 83],
    [224, 86],
    [227, 86],
    [227, 81],
    [227, 61],
    [224, 38],
    [106, 20],
    [105, 25],
    [107, 69],
    [108, 77],
    [112, 79],
    [131, 79],
    [136, 74],
    [145, 55],
    [147, 39],
    [147, 28],
    [140, 21],
  ]);

  return (
    <div>
      <h1>Sketch Drawing App</h1>
      <SketchCanvas coordinates={coordinates} />
    </div>
  );
};

export default App;
