// import React from "react";

// const Winner = ({ winner }) => {
//   const winnerStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     padding: "40px",
//     background: "rgba(0, 0, 0, 0.8)",
//     color: "#fff",
//     fontSize: "36px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//   };

//   return <div style={winnerStyle}>Winner is {winner}</div>;
// };

// export default Winner;

import React from "react";
import "./Winner.css";

const Winner = ({ winner, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Winner is {winner}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Winner;
