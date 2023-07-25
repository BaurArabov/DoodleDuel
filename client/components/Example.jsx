// import axios from "axios";
// import React from "react";

// const Example = () => {
//   const handleClickGetGif = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/draw_sketch/bus/0"
//       );
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return <button onClick={handleClickGetGif}>Get gif</button>;
// };

// export default Example;

import React from "react";

const Example = () => {
  return (
    <div>
      {/* <img src="/0.gif" alt="Sketch Animation" /> */}
      <p>gif</p>
      <img src="./0.gif" alt="gif" />
    </div>
  );
};

export default Example;
